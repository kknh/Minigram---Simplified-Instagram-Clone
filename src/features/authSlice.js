import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { auth } from '../constants/firebase'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth'
import { API_STATUS } from '../constants/apiStatus'

const initialState = {
	userId: '',
	status: API_STATUS.IDLE,
	error: null,
}

// const createUser = createAsyncThunk('auth/createUser', async (userInfo) => {
//     const {}

// })

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
	} catch (error) {
		console.log(error.code)
		if (error?.code) {
			return { error: error.code }
		} else {
			return error
		}
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
				state.error = action.payload
			})
			.addCase(signIn.fulfilled, (state, action) => {
				const error = action.payload.error || ''

				if (error) {
					state.status = API_STATUS.FAILED
					if (error === 'auth/wrong-password') {
						state.error = 'Wrong password...'
					} else if (error === 'auth/user-not-found') {
						state.error = 'Email address not found...'
					} else state.error = 'There is a problem with login...'
				} else {
					state.status = API_STATUS.SUCCEEDED
					state.userId = action.payload
					localStorage.setItem('loggedIn', true)
				}
			})
			.addCase(signOutUser.fulfilled, (state) => {
				state.status = API_STATUS.IDLE
				state.userId = ''
				localStorage.removeItem('loggedIn')
			})
	},
})

export const selectUserId = (state) => state.auth.userId
export const selectAuthStatus = (state) => state.auth.status
export default authSlice.reducer
