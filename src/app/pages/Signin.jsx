import styles from './Signin.module.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
	signIn,
	selectAuthStatus,
	selectUserId,
} from '../../features/authSlice'
import Loading from '../utils/Loading'
import { API_STATUS } from '../../constants/apiStatus'
import { auth } from '../../constants/firebase'

const Signin = () => {
	console.log('Signin rendered')
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const authStatus = useSelector(selectAuthStatus)
	const [showLoginForm, setShowLoginForm] = useState(false)
	const [showSignupForm, setShowSignupForm] = useState(false)

	const onToggleLoginForm = (e) => {
		setShowLoginForm((prev) => !prev)
	}
	const onToggleSignupForm = (e) => {
		setShowSignupForm((prev) => !prev)
	}

	const onClickSignInTest = (e) => {
		dispatch(signIn({ email: 'kunho@test.com', password: '123456' }))
			.unwrap()
			.then(() => {
				navigate('/')
			})
	}

	if (authStatus === API_STATUS.LOADING) {
		return <Loading />
	}

	return (
		<section className={styles.container}>
			<div className={styles.login}>
				<h1>Choose Log In Option:</h1>
				<div className={styles.loginOption} onClick={onClickSignInTest}>
					Login with test account 1
				</div>
				<div className={styles.loginOption}>Login with test account 2</div>
				<div className={styles.loginOption}>Login with test account 3</div>
				<div onClick={onToggleLoginForm} className={styles.loginOption}>
					Login with email and password
				</div>
				<form
					className={styles.form}
					style={{ display: showLoginForm ? 'flex' : 'none' }}
				>
					<input
						className={styles.input}
						type="email"
						placeholder="Enter email address..."
						required
					/>
					<input
						className={styles.input}
						type="password"
						placeholder="Enter password..."
						required
					/>
					<button type="submit">Log In</button>
				</form>
				<div onClick={onToggleSignupForm} className={styles.loginOption}>
					Create new account
				</div>
				<form
					className={styles.form}
					style={{ display: showSignupForm ? 'flex' : 'none' }}
				>
					<input
						className={styles.input}
						type="email"
						placeholder="Enter email address..."
						required
					/>
					<input
						className={styles.input}
						type="password"
						placeholder="Enter password..."
						required
					/>
					<button type="submit">Sign Up</button>
				</form>
			</div>
		</section>
	)
}
export default Signin
