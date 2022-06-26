import { Navigate, Outlet } from 'react-router-dom'
import { selectUserId, signOutUser } from '../../features/authSlice'
import { useSelector, useDispatch } from 'react-redux'

const RequireAuth = () => {
	console.log('RequireAuth rendered')
	const dispatch = useDispatch()
	const userId = useSelector(selectUserId)
	const lStorage = localStorage.getItem('loggedIn')
	const loggedIn = lStorage ? JSON.parse(lStorage) : false

	const isAuth = !!userId && loggedIn

	console.log('loggedIn', loggedIn)
	console.log('isAuth', isAuth)

	if (isAuth) {
		return <Outlet />
	}

	if (!isAuth) {
		dispatch(signOutUser())
		return <Navigate to="/login" />
	}
}

export default RequireAuth
