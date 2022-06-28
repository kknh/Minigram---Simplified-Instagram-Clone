import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { auth } from '../constants/firebase'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { API_STATUS } from '../constants/apiStatus'
import { toast } from 'react-toastify'

const initialState = {
	// userId: '',
	// userLogged: false,
	userId: 'g5ZVwx7s9peI5IoibwEjdalIYFy2', //temporary for testing
	userLogged: true, //temporary for testing
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
				state.userLogged = true
				state.error = null
			})
			.addCase(signOutUser.fulfilled, (state) => {
				state.status = API_STATUS.IDLE
				state.userLogged = false
			})
	},
})

export const selectUserId = (state) => state.auth.userId
export const selectUserLoggedStatus = (state) => state.auth.userLogged
export const selectAuthStatus = (state) => state.auth.status
export const selectAuthError = (state) => state.auth.error
export default authSlice.reducer
