import styles from './index.module.css'
import { parseISO, format } from 'date-fns'

const SingleMessage = ({ message, contact, loggedUserId, loggedUserName }) => {
	const date = message.date
		? format(parseISO(message.date), 'yyyy-MM-dd, HH:mm:ss')
		: 'date unknown'
	return (
		<div className={styles.container}>
			<span className={styles.sender}>
				{message.senderId === loggedUserId ? 'Me' : contact.username}
			</span>
			<span className={styles.message}>{message.message}</span>
			<span className={styles.date}>{date}</span>
		</div>
	)
}
export default SingleMessage
