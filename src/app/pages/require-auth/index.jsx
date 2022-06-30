import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserLoggedStatus } from '../../../features/authSlice'

const RequireAuth = () => {
	console.log('RequireAuth rendered')

	const isAuth = useSelector(selectUserLoggedStatus)

	if (isAuth) {
		return <Outlet />
	}

	if (!isAuth) {
		return <Navigate to="/login" />
	}
}

export default RequireAuth
