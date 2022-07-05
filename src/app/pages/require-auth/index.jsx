import { Navigate, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserId, signOutUser } from '../../../features/authSlice'

const RequireAuth = () => {
	console.log('RequireAuth rendered')
	const dispatch = useDispatch()
	const isAuth = useSelector(selectUserId)
	if (isAuth) {
		return <Outlet />
	}

	if (!isAuth) {
		dispatch(signOutUser())
		return <Navigate to="/login" />
	}
}

export default RequireAuth
