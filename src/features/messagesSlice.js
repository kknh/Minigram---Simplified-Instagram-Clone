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

export const fetchMessages = createAsyncThunk(
	'messages/fetchMessages',
	async () => {
		try {
			const response = await minigramApi.get('/messages')

			//setting date to initial data
			const randomNum = Math.ceil(Math.random() * 10)
			const messages = response.data
			const newMessages = messages.map((message, i) => {
				message.date = sub(new Date(), { minutes: randomNum + i }).toISOString()
				return message
			})

			return newMessages
		} catch (error) {
			return error.message
		}
	}
)

const messagesSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMessages.pending, (state) => {
				state.status = API_STATUS.LOADING
			})
			.addCase(fetchMessages.rejected, (state, action) => {
				state.status = API_STATUS.FAILED
				state.error = action.payload
			})
			.addCase(fetchMessages.fulfilled, (state, action) => {
				state.status = API_STATUS.SUCCEEDED
				state.error = null
				postsAdapter.setAll(state, action.payload)
			})
	},
})

export const { selectAll: selectAllMessages } = postsAdapter.getSelectors(
	(state) => state.messages
)
export const selectMessagesStatus = (state) => state.messages.status
export const selectMessagesError = (state) => state.messages.error
export default messagesSlice.reducer
