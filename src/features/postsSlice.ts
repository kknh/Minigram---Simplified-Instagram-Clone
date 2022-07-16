import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	nanoid,
} from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { API_STATUS } from '../api/apiStatus'
import minigramApi from '../api/minigram'

import {
	ref,
	uploadBytes,
	getDownloadURL,
	deleteObject,
} from 'firebase/storage'
import { storage } from '../api/firebase'
import { Comment, Post, RootState } from '../../types'

const postsAdapter = createEntityAdapter<Post>({
	sortComparer: (a, b) => b.date.localeCompare(a.date),
})

export interface ExtendedEntityAdapterState {
	status: string
	error: string | undefined
}

const initialState = postsAdapter.getInitialState<ExtendedEntityAdapterState>({
	status: API_STATUS.IDLE,
	error: '',
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const response = await minigramApi.get<Post[]>('/posts')
	return response.data
})

export const addNewPost = createAsyncThunk(
	'posts/addNewPost',
	async ({
		croppedImage,
		loggedUserId,
	}: {
		croppedImage: Blob
		loggedUserId: string
	}) => {
		const imageName = nanoid()
		const imageRef = ref(storage, `images/${imageName}`)
		const snapshot = await uploadBytes(imageRef, croppedImage)
		const url = await getDownloadURL(snapshot.ref)

		const newPost: Post = {
			id: nanoid(),
			userId: loggedUserId,
			image: url,
			image_name: imageName,
			desc: 'post image',
			date: new Date().toISOString(),
			liked_by: [],
			comments: [],
		}

		const response = await minigramApi.post<Post>('/posts', newPost)
		return response.data
	}
)

export const deletePost = createAsyncThunk(
	'posts/deletePost',
	async ({ postId, imageName }: { postId: string; imageName: string }) => {
		// const imageRef = ref(storage, `images/${imageName}`)
		// await deleteObject(imageRef)
		await minigramApi.delete(`/posts/${postId}`)
		return postId
	}
)

export const addComment = createAsyncThunk(
	'/posts/addComment',
	async ({
		comment,
		loggedUserId,
		postCopy,
	}: {
		comment: string
		loggedUserId: string
		postCopy: Post
	}) => {
		const newComment: Comment = {
			id: nanoid(),
			userId: loggedUserId,
			comment: comment,
			date: new Date().toISOString(),
		}
		const newPost: Post = {
			...postCopy,
			comments: [...postCopy.comments, newComment],
		}
		const response = await minigramApi.put<Post>(
			`/posts/${postCopy.id}`,
			newPost
		)
		return response.data
	}
)

export const deleteComment = createAsyncThunk(
	'posts/deleteComment',
	async ({ postCopy, id }: { postCopy: Post; id: string }) => {
		const filteredComments: Comment[] = postCopy.comments.filter(
			(comment) => comment.id !== id
		)
		const newPost: Post = {
			...postCopy,
			comments: filteredComments,
		}
		const response = await minigramApi.put<Post>(
			`/posts/${postCopy.id}`,
			newPost
		)
		return response.data
	}
)

export const addLike = createAsyncThunk(
	'posts/addLike',
	async ({
		postCopy,
		loggedUserId,
		postLiked,
	}: {
		postCopy: Post
		loggedUserId: string
		postLiked: boolean
	}) => {
		let newPost: Post
		if (postLiked) {
			newPost = {
				...postCopy,
				liked_by: postCopy.liked_by.filter(
					(likedUser) => likedUser !== loggedUserId
				),
			}
		} else {
			newPost = {
				...postCopy,
				liked_by: [...postCopy.liked_by, loggedUserId],
			}
		}
		const response = await minigramApi.put<Post>(
			`/posts/${postCopy.id}`,
			newPost
		)
		return response.data
	}
)

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			/***** fetchPosts *****/
			.addCase(fetchPosts.pending, (state) => {
				state.status = API_STATUS.LOADING
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = API_STATUS.FAILED
				state.error = action.error.message
				toast.error(action.error.message)
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = API_STATUS.SUCCEEDED
				state.error = ''
				postsAdapter.setAll(state, action.payload)
			})
			/***** addComment *****/
			.addCase(addComment.pending, (state) => {
				state.status = API_STATUS.LOADING
			})
			.addCase(addComment.rejected, (state, action) => {
				state.status = API_STATUS.FAILED
				state.error = action.error.message
				toast.error(action.error.message)
			})
			.addCase(addComment.fulfilled, (state, action) => {
				console.log('fulfilled payload', action.payload)
				state.status = API_STATUS.SUCCEEDED
				state.error = ''
				postsAdapter.upsertOne(state, action.payload)
			})
			/***** deleteComment *****/
			.addCase(deleteComment.pending, (state) => {
				state.status = API_STATUS.LOADING
			})
			.addCase(deleteComment.rejected, (state, action) => {
				state.status = API_STATUS.FAILED
				state.error = action.error.message
				toast.error(action.error.message)
			})
			.addCase(deleteComment.fulfilled, (state, action) => {
				console.log('fulfilled payload', action.payload)
				state.status = API_STATUS.SUCCEEDED
				state.error = ''
				postsAdapter.upsertOne(state, action.payload)
			})
			/***** addLike *****/
			.addCase(addLike.pending, (state) => {
				state.status = API_STATUS.LOADING
			})
			.addCase(addLike.rejected, (state, action) => {
				state.status = API_STATUS.FAILED
				state.error = action.error.message
				toast.error(action.error.message)
			})
			.addCase(addLike.fulfilled, (state, action) => {
				state.status = API_STATUS.SUCCEEDED
				state.error = ''
				postsAdapter.upsertOne(state, action.payload)
			})
			/***** addNewPost *****/
			.addCase(addNewPost.pending, (state) => {
				state.status = API_STATUS.LOADING
			})
			.addCase(addNewPost.rejected, (state, action) => {
				state.status = API_STATUS.FAILED
				state.error = action.error.message
				toast.error(action.error.message)
			})
			.addCase(addNewPost.fulfilled, (state, action) => {
				state.status = API_STATUS.SUCCEEDED
				state.error = ''
				postsAdapter.upsertOne(state, action.payload)
				toast.success('Post Added!')
			})
			/***** deletePost *****/
			.addCase(deletePost.pending, (state) => {
				state.status = API_STATUS.LOADING
			})
			.addCase(deletePost.rejected, (state, action) => {
				state.status = API_STATUS.FAILED
				state.error = action.error.message
				toast.error(action.error.message)
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				state.status = API_STATUS.SUCCEEDED
				state.error = ''
				postsAdapter.removeOne(state, action.payload)
				toast.success('Post Deleted!')
			})
	},
})

export const { selectAll: selectAllPosts, selectById: selectPostById } =
	postsAdapter.getSelectors<RootState>((state) => state.posts)
export const selectPostsStatus = (state: RootState) => state.posts.status
export default postsSlice.reducer
