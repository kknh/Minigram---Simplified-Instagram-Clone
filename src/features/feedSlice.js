import { sub } from 'date-fns'

import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit'
import { API_STATUS } from '../constants/apiStatus'
import minigramApi from '../api/minigram'

const feedAdapter = createEntityAdapter()

const initialState = feedAdapter.getInitialState({
	status: API_STATUS.IDLE,
	error: null,
})

export const fetchPosts = createAsyncThunk('feed/fetchPosts', async () => {
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
})

const feedSlice = createSlice({
	name: 'feed',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPosts.pending, (state) => {
				state.status = API_STATUS.LOADING
			})
			.addCase(fetchPosts.rejected, (state) => {
				state.status = API_STATUS.FAILED
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = API_STATUS.SUCCEEDED
				feedAdapter.upsertMany(state, action.payload)
			})
	},
})

export const { selectAll: selectAllPosts, selectById: selectPostById } =
	feedAdapter.getSelectors((state) => state.feed)

export default feedSlice.reducer
