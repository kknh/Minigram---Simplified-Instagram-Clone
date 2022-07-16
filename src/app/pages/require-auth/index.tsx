import { Navigate, Outlet } from 'react-router-dom'
import { selectUserId, signOutUser } from '../../../features/authSlice'
import { useAppDispatch, useAppSelector } from '../../setup/hooks'

const RequireAuth = (): JSX.Element => {
	console.log('RequireAuth rendered')
	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(selectUserId)
	if (isAuth) {
		return <Outlet />
	} else {
		dispatch(signOutUser())
		return <Navigate to="/login" />
	}
}

export default RequireAuth
