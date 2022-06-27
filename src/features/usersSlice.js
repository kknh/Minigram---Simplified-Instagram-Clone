import {
	createSlice,
	createEntityAdapter,
	createAsyncThunk,
} from '@reduxjs/toolkit'
import { API_STATUS } from '../constants/apiStatus'
import minigramApi from '../api/minigram'
import { auth } from '../constants/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState({
	status: API_STATUS.IDLE,
	error: null,
})

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	try {
		const response = await minigramApi.get('/users')
		return response.data
	} catch (err) {
		return err.message
	}
})

export const createUser = createAsyncThunk(
	'users/createUser',

	async (userInfo) => {
		const { email, password, username } = userInfo
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			const userId = userCredential.user.uid
			const newUser = {
				id: userId,
				username,
				posts: [],
				followers: [],
				following: [],
			}
			const createdUser = await minigramApi.post('/users', newUser)
			return createdUser.data
		} catch (err) {
			return err
		}
	}
)

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.status = API_STATUS.SUCCEEDED
				state.error = null
				usersAdapter.setAll(state, action.payload)
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.status = API_STATUS.FAILED
				state.error = action.payload
			})
			.addCase(createUser.rejected, (state, action) => {
				console.log('action payload when error', action.payload)
				state.status = API_STATUS.FAILED
				state.error = action.payload
			})
			.addCase(createUser.pending, (state) => {
				state.status = API_STATUS.LOADING
			})
			.addCase(createUser.fulfilled, (state, action) => {
				if (action.payload.code) {
					state.status = API_STATUS.FAILED
					state.error = action.payload.code
				} else {
					state.status = API_STATUS.SUCCEEDED
					state.error = null
					usersAdapter.setOne(state, action.payload)
				}
			})
	},
})

export const { selectAll: selectAllUsers } = usersAdapter.getSelectors(
	(state) => state.users
)
export const selectUsersStatus = (state) => state.users.status
export const selectUsersError = (state) => state.users.error
export default usersSlice.reducer
