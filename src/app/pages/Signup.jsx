import styles from './Signup.module.css'
import { Link } from 'react-router-dom'

const Signup = () => {
	return (
		<section className={styles.container}>
			<form className={styles.signup}>
				<h1>Sign Up</h1>
				<div className={styles.formGroup}>
					<label htmlFor="username" className="formLabel">
						Username:
					</label>
					<input id="username" type="text" placeholder="Enter username..." />
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="email" className="formLabel">
						Email:
					</label>
					<input id="email" type="email" placeholder="Enter email..." />
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="password" className="formLabel">
						Password:
					</label>
					<input
						id="password"
						type="password"
						placeholder="Enter password..."
					/>
				</div>
				<button type="submit">Sign Up</button>
				<p>
					Already have an account? <Link to="/">Go to login page</Link>
				</p>
			</form>
		</section>
	)
}
export default Signup
