import { Navigate, Outlet } from 'react-router-dom'
import { selectUserLoggedStatus, signOutUser } from '../../features/authSlice'
import { useSelector, useDispatch } from 'react-redux'

const RequireAuth = () => {
	console.log('RequireAuth rendered')
	const dispatch = useDispatch()
	const loggedStatus = useSelector(selectUserLoggedStatus)
	// const lStorage = localStorage.getItem('loggedIn')
	// const loggedIn = lStorage ? JSON.parse(lStorage) : false

	const isAuth = loggedStatus

	console.log('isAuth', isAuth)

	if (isAuth) {
		return <Outlet />
	}

	if (!isAuth) {
		// dispatch(signOutUser())
		return <Navigate to="/login" />
	}
}

export default RequireAuth
