import styles from './Login.module.css'
import { Link } from 'react-router-dom'
import { signIn } from '../../features/authSlice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

const Login = () => {
	const dispatch = useDispatch()
	const [userInfo, setUserInfo] = useState({
		email: '',
		password: '',
	})

	const onSubmitHandler = (e) => {
		e.preventDefault()
		dispatch(signIn(userInfo))
	}

	const onChangeHandler = (e) => {
		setUserInfo((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	return (
		<section className={styles.container}>
			<form className={styles.login} onSubmit={onSubmitHandler}>
				<h1>Login</h1>
				<div className={styles.formGroup}>
					<label htmlFor="email" className={styles.formLabel}>
						Email:
					</label>
					<input
						className={styles.formInput}
						id="email"
						name="email"
						value={userInfo.email}
						type="email"
						placeholder="Enter email..."
						onChange={onChangeHandler}
						required
					/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="password" className={styles.formLabel}>
						Password:
					</label>
					<input
						className={styles.formInput}
						id="password"
						name="password"
						value={userInfo.password}
						type="password"
						placeholder="Enter password..."
						onChange={onChangeHandler}
						required
					/>
				</div>
				<button type="submit">Log In</button>
				<p>
					Don't have an account? <Link to="/">Create new account</Link>
				</p>
			</form>
		</section>
	)
}
export default Login
