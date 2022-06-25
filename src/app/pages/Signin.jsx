import styles from './Signin.module.css'
import { useState } from 'react'
const Signin = () => {
	const [showLoginForm, setShowLoginForm] = useState(false)
	const [showSignupForm, setShowSignupForm] = useState(false)

	const onToggleLoginForm = (e) => {
		setShowLoginForm((prev) => !prev)
	}
	const onToggleSignupForm = (e) => {
		setShowSignupForm((prev) => !prev)
	}

	return (
		<section className={styles.container}>
			<div className={styles.login}>
				<h1>Choose Log In Option:</h1>
				<div className={styles.loginOption}>Login with test account 1</div>
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
