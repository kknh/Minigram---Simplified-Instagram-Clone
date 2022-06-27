import styles from './Signin.module.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
	signIn,
	selectAuthError,
	selectAuthStatus,
} from '../../features/authSlice'
import { fetchPosts } from '../../features/postsSlice'
import { fetchMessages } from '../../features/messagesSlice'
import { API_STATUS } from '../../constants/apiStatus'
import {
	fetchUsers,
	createUser,
	selectUsersStatus,
	selectUsersError,
	selectAllUsers,
} from '../../features/usersSlice'
import Loading from '../utils/Loading'

const Signin = () => {
	console.log('Signin rendered')
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const authError = useSelector(selectAuthError)
	const usersError = useSelector(selectUsersError)
	const [formError, setFormError] = useState('')
	const authStatus = useSelector(selectAuthStatus)
	const userStatus = useSelector(selectUsersStatus)
	const allUsers = useSelector(selectAllUsers)
	const [showLoginForm, setShowLoginForm] = useState(false)
	const [showSignupForm, setShowSignupForm] = useState(false)
	const [loginForm, setLoginForm] = useState({
		email: '',
		password: '',
	})
	const [signupForm, setSignupForm] = useState({
		username: '',
		email: '',
		password: '',
	})

	const testAccounts = {
		1: {
			email: 'kunho@test.com',
			password: '123456',
		},
		2: {
			email: 'selma@test.com',
			password: '123456',
		},
		3: {
			email: 'marko@test.com',
			password: '123456',
		},
	}

	let error = formError || usersError || authError

	useEffect(() => {
		dispatch(fetchPosts())
		dispatch(fetchMessages())
		dispatch(fetchUsers())
	}, [dispatch])

	const onToggleLoginForm = (e) => {
		setShowLoginForm((prev) => !prev)
		setLoginForm({
			email: '',
			password: '',
		})
	}
	const onToggleSignupForm = (e) => {
		setShowSignupForm((prev) => !prev)
		setSignupForm({
			username: '',
			email: '',
			password: '',
		})
	}

	const onClickSignInTest = (testAccNr) => {
		if (authStatus === API_STATUS.LOADING) return

		dispatch(signIn(testAccounts[testAccNr]))
			.unwrap()
			.then(() => {
				navigate('/')
			})
	}

	const onSubmitLogInHandler = (e) => {
		e.preventDefault()
		if (authStatus === API_STATUS.LOADING) return
		dispatch(signIn(loginForm))
			.unwrap()
			.then(() => {
				navigate('/')
			})
	}

	const onSubmitSignUpHandler = (e) => {
		e.preventDefault()
		if (allUsers.find((user) => user.username === signupForm.username)) {
			setFormError('username already in use!')
			return
		} else if (userStatus === API_STATUS.LOADING) {
			return
		} else {
			setFormError('')
			dispatch(createUser(signupForm))
		}
	}

	const onLoginChangeHandler = (e) => {
		setLoginForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	const onSignupChangeHandler = (e) => {
		setSignupForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	if (authStatus === API_STATUS.LOADING || userStatus === API_STATUS.LOADING) {
		return <Loading />
	}

	return (
		<section className={styles.container}>
			<div className={styles.login}>
				<h1>Choose Log In Option:</h1>
				<div
					className={styles.loginOption}
					onClick={() => onClickSignInTest(1)}
				>
					Login with test account 1
				</div>
				<div
					className={styles.loginOption}
					onClick={() => onClickSignInTest(2)}
				>
					Login with test account 2
				</div>
				<div
					className={styles.loginOption}
					onClick={() => onClickSignInTest(3)}
				>
					Login with test account 3
				</div>
				<div onClick={onToggleLoginForm} className={styles.loginOption}>
					Login with email and password
				</div>
				<form
					onSubmit={onSubmitLogInHandler}
					className={styles.form}
					style={{ display: showLoginForm ? 'flex' : 'none' }}
				>
					<input
						className={styles.input}
						type="email"
						placeholder="Enter email address..."
						value={loginForm.email}
						name="email"
						onChange={onLoginChangeHandler}
						required
					/>
					<input
						className={styles.input}
						type="password"
						placeholder="Enter password..."
						value={loginForm.password}
						name="password"
						onChange={onLoginChangeHandler}
						required
					/>
					<button type="submit">Log In</button>
				</form>
				<div onClick={onToggleSignupForm} className={styles.loginOption}>
					Create new account
				</div>
				<form
					onSubmit={onSubmitSignUpHandler}
					className={styles.form}
					style={{ display: showSignupForm ? 'flex' : 'none' }}
				>
					<input
						className={styles.input}
						type="text"
						placeholder="Enter username..."
						value={signupForm.username}
						name="username"
						onChange={onSignupChangeHandler}
						required
					/>
					<input
						className={styles.input}
						type="email"
						placeholder="Enter email address..."
						value={signupForm.email}
						onChange={onSignupChangeHandler}
						name="email"
						required
					/>
					<input
						className={styles.input}
						type="password"
						placeholder="Enter password..."
						value={signupForm.password}
						onChange={onSignupChangeHandler}
						name="password"
						required
					/>
					<button type="submit">Sign Up</button>
				</form>
				{error && (
					<span style={{ color: 'red', padding: '20px' }}>{error}</span>
				)}
			</div>
		</section>
	)
}
export default Signin
