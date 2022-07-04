import styles from './index.module.css'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { API_STATUS } from '../../../api/apiStatus'
import Loading from '../../utils/loading'
import { signIn, selectAuthStatus } from '../../../features/authSlice'
import { fetchPosts } from '../../../features/postsSlice'
import { fetchMessages } from '../../../features/messagesSlice'
import {
	fetchUsers,
	createUser,
	selectUsersStatus,
	selectAllUsers,
} from '../../../features/usersSlice'

const Signin = () => {
	console.log('Signin rendered')
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const authStatus = useSelector(selectAuthStatus)
	const usersStatus = useSelector(selectUsersStatus)
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

	useEffect(() => {
		dispatch(fetchPosts())
		dispatch(fetchMessages())
		dispatch(fetchUsers())
	}, [dispatch])

	const toggleLoginForm = (e) => {
		setShowLoginForm((prev) => !prev)
		setLoginForm({
			email: '',
			password: '',
		})
	}
	const toggleSignUpForm = (e) => {
		setShowSignupForm((prev) => !prev)
		setSignupForm({
			username: '',
			email: '',
			password: '',
		})
	}

	const signInWithTestAcc = (testAccNr) => {
		if (authStatus === API_STATUS.LOADING) return

		dispatch(signIn(testAccounts[testAccNr]))
			.unwrap()
			.then(() => {
				navigate('/')
			})
	}

	const logInHandler = (e) => {
		e.preventDefault()
		if (authStatus === API_STATUS.LOADING) return
		dispatch(signIn(loginForm))
			.unwrap()
			.then(() => {
				navigate('/')
			})
	}

	const signUpHandler = (e) => {
		e.preventDefault()
		if (allUsers.find((user) => user.username === signupForm.username)) {
			toast.error('Username already in use!')
			return
		} else if (usersStatus === API_STATUS.LOADING) {
			return
		} else {
			dispatch(createUser(signupForm))
		}
	}

	const logInFormChangeHandler = (e) => {
		setLoginForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	const signUpFormChangeHandler = (e) => {
		setSignupForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	const LoadingSpinner =
		authStatus === API_STATUS.LOADING || usersStatus === API_STATUS.LOADING ? (
			<Loading />
		) : (
			''
		)

	return (
		<section className={styles.container}>
			{LoadingSpinner}
			<div className={styles.login}>
				<h1>Choose Log In Option:</h1>
				<div
					className={styles.loginOption}
					onClick={() => signInWithTestAcc(1)}
				>
					Login with test account 1
				</div>
				<div
					className={styles.loginOption}
					onClick={() => signInWithTestAcc(2)}
				>
					Login with test account 2
				</div>
				<div
					className={styles.loginOption}
					onClick={() => signInWithTestAcc(3)}
				>
					Login with test account 3
				</div>
				<div onClick={toggleLoginForm} className={styles.loginOption}>
					Login with email and password
				</div>
				<form
					onSubmit={logInHandler}
					className={styles.form}
					style={{ display: showLoginForm ? 'flex' : 'none' }}
				>
					<input
						className={styles.input}
						type="email"
						placeholder="Enter email address..."
						value={loginForm.email}
						name="email"
						onChange={logInFormChangeHandler}
						required
					/>
					<input
						className={styles.input}
						type="password"
						placeholder="Enter password..."
						value={loginForm.password}
						name="password"
						onChange={logInFormChangeHandler}
						required
					/>
					<button type="submit">Log In</button>
				</form>
				<div onClick={toggleSignUpForm} className={styles.loginOption}>
					Create new account
				</div>
				<form
					onSubmit={signUpHandler}
					className={styles.form}
					style={{ display: showSignupForm ? 'flex' : 'none' }}
				>
					<input
						className={styles.input}
						type="text"
						placeholder="Enter username..."
						value={signupForm.username}
						name="username"
						onChange={signUpFormChangeHandler}
						required
					/>
					<input
						className={styles.input}
						type="email"
						placeholder="Enter email address..."
						value={signupForm.email}
						onChange={signUpFormChangeHandler}
						name="email"
						required
					/>
					<input
						className={styles.input}
						type="password"
						placeholder="Enter password..."
						value={signupForm.password}
						onChange={signUpFormChangeHandler}
						name="password"
						required
					/>
					<button type="submit">Sign Up</button>
				</form>
			</div>
		</section>
	)
}
export default Signin
