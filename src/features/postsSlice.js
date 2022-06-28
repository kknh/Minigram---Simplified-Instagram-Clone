import { sub } from 'date-fns'

import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit'
import { API_STATUS } from '../constants/apiStatus'
import minigramApi from '../api/minigram'
import { nanoid } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const postsAdapter = createEntityAdapter()

const initialState = postsAdapter.getInitialState({
	status: API_STATUS.IDLE,
	error: null,
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const response = await minigramApi.get('/posts')
	return response.data

	//setting date to initial data
	// const randomNum = Math.ceil(Math.random() * 10)
	// const newPosts = posts.map((post, i) => {
	// 	post.date = sub(new Date(), { minutes: randomNum + i }).toISOString()
	// 	post.comments.forEach((c, i) => {
	// 		c.date = sub(new Date(), { minutes: randomNum + i }).toISOString()
	// 	})
	// 	return post
	// })
})

export const addComment = createAsyncThunk(
	'/posts/addComment',
	async ({ comment, loggedUser, postCopy }) => {
		const newComment = {
			id: nanoid(),
			userId: loggedUser,
			comment: comment,
			date: new Date().toISOString(),
		}
		const newPost = {
			...postCopy,
			comments: [...postCopy.comments, newComment],
		}
		const response = await minigramApi.put(`/posts/${postCopy.id}`, newPost)
		return response.data
	}
)

export const deleteComment = createAsyncThunk(
	'posts/deleteComment',
	async ({ postCopy, id }) => {
		const filteredComments = postCopy.comments.filter(
			(comment) => comment.id !== id
		)
		const newPost = {
			...postCopy,
			comments: filteredComments,
		}
		const response = await minigramApi.put(`/posts/${postCopy.id}`, newPost)
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
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = API_STATUS.SUCCEEDED
				state.error = null
				postsAdapter.setAll(state, action.payload)
			})
			/***** addComment *****/
			.addCase(addComment.pending, (state) => {
				state.status = API_STATUS.LOADING
			})
			.addCase(addComment.rejected, (state, action) => {
				state.status = API_STATUS.FAILED
				state.error = action.error.message
			})
			.addCase(addComment.fulfilled, (state, action) => {
				console.log('fulfilled payload', action.payload)
				state.status = API_STATUS.SUCCEEDED
				state.error = null
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
				state.error = null
				postsAdapter.upsertOne(state, action.payload)
			})
	},
})

export const { selectAll: selectAllPosts, selectById: selectPostById } =
	postsAdapter.getSelectors((state) => state.posts)
export const selectPostsStatus = (state) => state.posts.status
export const selectPostsError = (state) => state.posts.error
export default postsSlice.reducer
