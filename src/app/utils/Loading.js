import styles from './Loading.module.css'

const Loading = () => {
	console.log('Loading rendered')
	return (
		<div className={styles.container}>
			<div className={styles['lds-spinner']}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}
export default Loading
