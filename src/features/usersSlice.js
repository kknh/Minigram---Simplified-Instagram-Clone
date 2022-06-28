import {
	createSlice,
	createEntityAdapter,
	createAsyncThunk,
} from '@reduxjs/toolkit'
import { API_STATUS } from '../constants/apiStatus'
import minigramApi from '../api/minigram'
import { auth } from '../constants/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState({
	status: API_STATUS.IDLE,
	error: null,
})

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const response = await minigramApi.get('/users')
	return response.data
})

export const createUser = createAsyncThunk(
	'users/createUser',

	async (userInfo) => {
		const { email, password, username } = userInfo

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
				state.error = action.error.message
			})
			.addCase(createUser.rejected, (state, action) => {
				state.status = API_STATUS.FAILED
				toast.error(action.error.message)
				state.error = action.error.message
			})
			.addCase(createUser.pending, (state) => {
				state.status = API_STATUS.LOADING
			})
			.addCase(createUser.fulfilled, (state, action) => {
				state.status = API_STATUS.SUCCEEDED
				state.error = null
				usersAdapter.setOne(state, action.payload)
			})
	},
})

export const { selectAll: selectAllUsers, selectById: selectUserById } =
	usersAdapter.getSelectors((state) => state.users)
export const selectUsersStatus = (state) => state.users.status
export const selectUsersError = (state) => state.users.error
export default usersSlice.reducer