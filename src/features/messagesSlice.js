import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	nanoid,
	createSelector,
} from '@reduxjs/toolkit'
import { API_STATUS } from '../api/apiStatus'
import minigramApi from '../api/minigram'

const messagesAdapter = createEntityAdapter()

const initialState = messagesAdapter.getInitialState({
	status: API_STATUS.IDLE,
	error: null,
})

export const fetchMessages = createAsyncThunk(
	'messages/fetchMessages',
	async () => {
		const response = await minigramApi.get('/messages')
		return response.data
	}
)

export const addMessage = createAsyncThunk(
	'messages/addMessage',
	async ({ sender_id, receiver_id, message }) => {
		const newMessage = {
			id: nanoid(),
			sender_id,
			receiver_id,
			message,
			date: new Date().toISOString(),
		}
		console.log(newMessage)
		const response = await minigramApi.post('/messages', newMessage)
		return response.data
	}
)

const messagesSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			/***** fetchMessages *****/
			.addCase(fetchMessages.pending, (state) => {
				state.status = API_STATUS.LOADING
			})
			.addCase(fetchMessages.rejected, (state, action) => {
				state.status = API_STATUS.FAILED
				state.error = action.error.message
			})
			.addCase(fetchMessages.fulfilled, (state, action) => {
				state.status = API_STATUS.SUCCEEDED
				state.error = null
				messagesAdapter.setAll(state, action.payload)
			})
			/***** addMessage *****/
			.addCase(addMessage.pending, (state) => {
				state.status = API_STATUS.LOADING
			})
			.addCase(addMessage.rejected, (state, action) => {
				state.status = API_STATUS.FAILED
				state.error = action.error.message
			})
			.addCase(addMessage.fulfilled, (state, action) => {
				state.status = API_STATUS.SUCCEEDED
				state.error = null
				messagesAdapter.addOne(state, action.payload)
			})
	},
})

export const { selectAll: selectAllMessages } = messagesAdapter.getSelectors(
	(state) => state.messages
)
export const selectMessagesByUser = createSelector(
	[selectAllMessages, (state, userId) => userId],
	(allMessages, userId) =>
		allMessages.filter(
			(message) =>
				message.sender_id === userId || message.receiver_id === userId
		)
)

export const selectMessagesStatus = (state) => state.messages.status
export const selectMessagesError = (state) => state.messages.error
export default messagesSlice.reducer
