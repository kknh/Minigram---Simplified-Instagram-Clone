import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/postsSlice'
import authReducer from '../features/authSlice'

export const store = configureStore({
	reducer: {
		posts: postsReducer,
		auth: authReducer,
	},
})
