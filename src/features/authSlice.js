import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { toast } from 'react-toastify'
import { API_STATUS } from '../api/apiStatus'
import { auth } from '../api/firebase'

const initialState = {
	userId: '',
	status: API_STATUS.IDLE,
	error: null,
}

export const signIn = createAsyncThunk('auth/signIn', async (userInfo) => {
	const { email, password } = userInfo

	const userCredential = await signInWithEmailAndPassword(auth, email, password)
	const userId = userCredential.user.uid
	return userId
})

export const signOutUser = createAsyncThunk('auth/signOut', async () => {
	signOut(auth)
})

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(signIn.pending, (state) => {
				state.status = API_STATUS.LOADING
			})
			.addCase(signIn.rejected, (state, action) => {
				state.status = API_STATUS.FAILED
				toast.error(action.error.message)
				state.error = action.error.message
			})
			.addCase(signIn.fulfilled, (state, action) => {
				state.status = API_STATUS.SUCCEEDED
				state.userId = action.payload
				state.error = null
			})
			.addCase(signOutUser.fulfilled, (state) => {
				state.status = API_STATUS.IDLE
				state.userId = ''
				state.error = null
			})
	},
})

export const selectUserId = (state) => state.auth.userId
export const selectAuthStatus = (state) => state.auth.status
export default authSlice.reducer
