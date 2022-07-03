import styles from './index.module.css'

const DeleteConfirmation = ({
	showConfirmation,
	setShowConfirmation,
	deletePostHandler,
}) => {
	return (
		<article
			className={styles.container}
			style={{ display: showConfirmation ? 'flex' : 'none' }}
		>
			<div className={styles.wrapper}>
				<p className={styles.question}>
					Are you sure you want to delete the post?
				</p>
				<button className={styles.yesBtn} onClick={deletePostHandler}>
					Yes
				</button>
				<button
					className={styles.noBtn}
					onClick={() => setShowConfirmation(false)}
				>
					No
				</button>
			</div>
		</article>
	)
}
export default DeleteConfirmation
