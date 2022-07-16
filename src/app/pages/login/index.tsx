import styles from './index.module.css'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../setup/hooks'
import { Link, useNavigate } from 'react-router-dom'
import { API_STATUS } from '../../../api/apiStatus'
import Loading from '../../utils/loading'
import { signIn, selectAuthStatus } from '../../../features/authSlice'
import { fetchPosts } from '../../../features/postsSlice'
import { fetchMessages } from '../../../features/messagesSlice'
import { fetchUsers, selectUsersStatus } from '../../../features/usersSlice'

const Signin = () => {
	console.log('Signin rendered')
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const authStatus = useAppSelector(selectAuthStatus)
	const usersStatus = useAppSelector(selectUsersStatus)
	interface LoginForm {
		email: string
		password: string
	}
	const [loginForm, setLoginForm] = useState<LoginForm>({
		email: '',
		password: '',
	})

	useEffect(() => {
		dispatch(fetchPosts())
		dispatch(fetchMessages())
		dispatch(fetchUsers())
	}, [dispatch])

	const testAccounts = {
		'1': {
			email: 'kunho@test.com',
			password: '123456',
		},
		'2': {
			email: 'selma@test.com',
			password: '123456',
		},
		'3': {
			email: 'marko@test.com',
			password: '123456',
		},
	}

	const logInHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (authStatus === API_STATUS.LOADING) return
		dispatch(signIn(loginForm))
			.unwrap()
			.then(() => {
				navigate('/')
			})
	}

	const logInFormChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	const selectTestAccountHandler = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		const value = e.target.value
		if (value !== 'none') setLoginForm(testAccounts[value as '1' | '2' | '3'])
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
				<h1>Minigram</h1>
				<form onSubmit={logInHandler} className={styles.form}>
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
				<div className={styles.or}>OR</div>
				<div className={styles.selectContainer}>
					<select
						onChange={selectTestAccountHandler}
						id="test"
						className={styles.select}
					>
						<option value="none">Choose Test Account</option>
						<option value="1">Test account 1</option>
						<option value="2">Test account 2</option>
						<option value="3">Test account 3</option>
					</select>
				</div>
			</div>
			<div className={styles.signup}>
				<div className={styles.redirect}>
					<span>Don't have an account?</span>
					<Link to="/signup">Sign up</Link>
				</div>
			</div>
		</section>
	)
}
export default Signin
