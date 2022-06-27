import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/postsSlice'
import authReducer from '../features/authSlice'
import messagesReducer from '../features/messagesSlice'
import usersReducer from '../features/usersSlice'
export const store = configureStore({
	reducer: {
		posts: postsReducer,
		auth: authReducer,
		messages: messagesReducer,
		users: usersReducer,
	},
})
