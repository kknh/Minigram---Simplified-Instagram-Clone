import { Navigate, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
	selectUserLoggedStatus,
	signOutUser,
} from '../../../features/authSlice'

const RequireAuth = () => {
	console.log('RequireAuth rendered')
	const dispatch = useDispatch()
	const isAuth = useSelector(selectUserLoggedStatus)
	// const isAuth = true //for testing
	if (isAuth) {
		return <Outlet />
	}

	if (!isAuth) {
		dispatch(signOutUser())
		return <Navigate to="/login" />
	}
}

export default RequireAuth
