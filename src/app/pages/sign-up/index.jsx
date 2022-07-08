import styles from './index.module.css'
import { useState } from 'react'
import Loading from '../../utils/loading'
import { toast } from 'react-toastify'
import { API_STATUS } from '../../../api/apiStatus'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { selectAuthStatus } from '../../../features/authSlice'
import {
	createUser,
	selectUsersStatus,
	selectAllUsers,
} from '../../../features/usersSlice'

const SignUp = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const authStatus = useSelector(selectAuthStatus)
	const usersStatus = useSelector(selectUsersStatus)
	const allUsers = useSelector(selectAllUsers)

	const [signupForm, setSignupForm] = useState({
		username: '',
		email: '',
		password: '',
	})

	const LoadingSpinner =
		authStatus === API_STATUS.LOADING || usersStatus === API_STATUS.LOADING ? (
			<Loading />
		) : (
			''
		)

	const signUpHandler = (e) => {
		e.preventDefault()
		if (allUsers.find((user) => user.username === signupForm.username)) {
			toast.error('Username already in use!')
			return
		} else if (usersStatus === API_STATUS.LOADING) {
			return
		} else {
			dispatch(createUser(signupForm))
				.unwrap()
				.then(() => navigate('/login'))
				.catch((err) => toast.error(err))
		}
	}

	const signUpFormChangeHandler = (e) => {
		setSignupForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	return (
		<section className={styles.container}>
			{LoadingSpinner}
			<div className={styles.signUp}>
				<h1>Minigram</h1>

				<form onSubmit={signUpHandler} className={styles.form}>
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
			<div className={styles.login}>
				<div className={styles.redirect}>
					<span>Already have an account?</span>
					<Link to="/login">Login</Link>
				</div>
			</div>
		</section>
	)
}
export default SignUp
