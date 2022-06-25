import { configureStore } from '@reduxjs/toolkit'
import feedReducer from '../features/feedSlice'
import authReducer from '../features/authSlice'

export const store = configureStore({
	reducer: {
		feed: feedReducer,
		auth: authReducer,
	},
})
