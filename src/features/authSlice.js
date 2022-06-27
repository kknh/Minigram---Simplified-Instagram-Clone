import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { auth } from '../constants/firebase'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { API_STATUS } from '../constants/apiStatus'

const initialState = {
	userId: '',
	userLogged: false,
	status: API_STATUS.IDLE,
	error: null,
}

export const signIn = createAsyncThunk('auth/signIn', async (userInfo) => {
	const { email, password } = userInfo
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		)
		const userId = userCredential.user.uid
		return userId
	} catch (err) {
		return err
	}
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
				state.error = action.error.message ? action.error.message : action.error
			})
			.addCase(signIn.fulfilled, (state, action) => {
				const errorCode = action.payload.code ? action.payload.code : ''

				if (errorCode) {
					state.status = API_STATUS.FAILED
					if (errorCode === 'auth/wrong-password') {
						state.error = 'Wrong password...'
					} else if (errorCode === 'auth/user-not-found') {
						state.error = 'Email address not found...'
					} else state.error = errorCode
				} else {
					state.status = API_STATUS.SUCCEEDED
					state.userId = action.payload
					state.userLogged = true
					state.error = null
					// localStorage.setItem('loggedIn', true)
				}
			})
			.addCase(signOutUser.fulfilled, (state) => {
				state.status = API_STATUS.IDLE
				state.userLogged = false
				// localStorage.removeItem('loggedIn')
			})
	},
})

export const selectUserId = (state) => state.auth.userId
export const selectUserLoggedStatus = (state) => state.auth.userLogged
export const selectAuthStatus = (state) => state.auth.status
export const selectAuthError = (state) => state.auth.error
export default authSlice.reducer
