import styles from './index.module.css'
import { parseISO, format } from 'date-fns'
import { useSelector } from 'react-redux'
import { selectUserId } from '../../../features/authSlice'
import { selectUserById } from '../../../features/usersSlice'

const SingleMessage = ({ message, contact }) => {
	const loggedUserId = useSelector(selectUserId)

	const date = message.date
		? format(parseISO(message.date), 'yyyy-MM-dd, HH:mm:ss')
		: 'date unknown'

	return (
		<div className={styles.container}>
			<span className={styles.sender}>
				{message.sender_id === loggedUserId ? 'Me' : contact.username}
			</span>
			<span className={styles.message}>{message.message}</span>
			<span className={styles.date}>{date}</span>
		</div>
	)
}
export default SingleMessage
