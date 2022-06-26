import { sub } from 'date-fns'

import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit'
import { API_STATUS } from '../constants/apiStatus'
import minigramApi from '../api/minigram'

const postsAdapter = createEntityAdapter()

const initialState = postsAdapter.getInitialState({
	status: API_STATUS.IDLE,
	error: null,
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	try {
		const response = await minigramApi.get('/posts')

		//setting date to initial data
		const randomNum = Math.ceil(Math.random() * 10)
		const posts = response.data
		const newPosts = posts.map((post, i) => {
			post.date = sub(new Date(), { minutes: randomNum + i }).toISOString()
			post.comments.forEach((c, i) => {
				c.date = sub(new Date(), { minutes: randomNum + i }).toISOString()
			})
			return post
		})

		return newPosts
	} catch (error) {
		return error.message
	}
})

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPosts.pending, (state) => {
				state.status = API_STATUS.LOADING
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = API_STATUS.FAILED
				state.error = action.payload
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = API_STATUS.SUCCEEDED
				state.error = null
				postsAdapter.upsertMany(state, action.payload)
			})
	},
})

export const { selectAll: selectAllPosts, selectById: selectPostById } =
	postsAdapter.getSelectors((state) => state.posts)
export const selectPostsStatus = (state) => state.posts.status
export const selectPostsError = (state) => state.posts.error
export default postsSlice.reducer
