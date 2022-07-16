import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	nanoid,
	createSelector,
} from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { Message, RootState } from '../../types'
import { API_STATUS } from '../api/apiStatus'
import minigramApi from '../api/minigram'

const messagesAdapter = createEntityAdapter<Message>()

interface ExtendedEntityAdapterState {
	status: string
	error: string | undefined
}

const initialState =
	messagesAdapter.getInitialState<ExtendedEntityAdapterState>({
		status: API_STATUS.IDLE,
		error: '',
	})

export const fetchMessages = createAsyncThunk(
	'messages/fetchMessages',
	async () => {
		const response = await minigramApi.get<Message[]>('/messages')
		return response.data
	}
)

interface AddMessageProps {
	sender_id: string
	receiver_id: string
	message: string
}

export const addMessage = createAsyncThunk(
	'messages/addMessage',
	async ({ sender_id, receiver_id, message }: AddMessageProps) => {
		const newMessage: Message = {
			id: nanoid(),
			sender_id,
			receiver_id,
			message,
			date: new Date().toISOString(),
			seen_status: false,
		}
		const response = await minigramApi.post<Message>('/messages', newMessage)
		return response.data
	}
)

export const messagesSeen = createAsyncThunk(
	'messages/messagesSeen',
	async (newMessages: Message[]) => {
		const promises = newMessages.map((message) => {
			return minigramApi.put<Message>(`/messages/${message.id}`, {
				...message,
				seen_status: true,
			})
		})
		const responses = await Promise.all(promises)
		return responses.map((response) => response.data)
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
				toast.error(action.error.message)
			})
			.addCase(fetchMessages.fulfilled, (state, action) => {
				state.status = API_STATUS.SUCCEEDED
				state.error = ''
				messagesAdapter.setAll(state, action.payload)
			})
			/***** addMessage *****/
			.addCase(addMessage.pending, (state) => {
				state.status = API_STATUS.LOADING
			})
			.addCase(addMessage.rejected, (state, action) => {
				state.status = API_STATUS.FAILED
				state.error = action.error.message
				toast.error(action.error.message)
			})
			.addCase(addMessage.fulfilled, (state, action) => {
				state.status = API_STATUS.SUCCEEDED
				state.error = ''
				messagesAdapter.addOne(state, action.payload)
			})
			/**** messagesSeen *****/
			.addCase(messagesSeen.pending, (state) => {
				state.status = API_STATUS.LOADING
			})
			.addCase(messagesSeen.rejected, (state, action) => {
				state.status = API_STATUS.FAILED
				state.error = action.error.message
				toast.error(action.error.message)
			})
			.addCase(messagesSeen.fulfilled, (state, action) => {
				state.status = API_STATUS.SUCCEEDED
				state.error = ''
				messagesAdapter.upsertMany(state, action.payload)
			})
	},
})

export const { selectAll: selectAllMessages } =
	messagesAdapter.getSelectors<RootState>((state) => state.messages)

export const selectMessagesByUser = createSelector(
	[selectAllMessages, (state, userId: string) => userId],
	(allMessages, userId) =>
		allMessages.filter(
			(message) =>
				message.sender_id === userId || message.receiver_id === userId
		)
)

export const selectMessagesStatus = (state: RootState) => state.messages.status
export default messagesSlice.reducer
