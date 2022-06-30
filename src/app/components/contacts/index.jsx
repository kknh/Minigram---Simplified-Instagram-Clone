import styles from './index.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserById } from '../../../features/usersSlice'
import { selectUserId } from '../../../features/authSlice'
import { messagesSeen } from '../../../features/messagesSlice'
import SingleContact from '../single-contact'

const Contacts = ({ contacts, setContact, allMessagesByLoggedUser }) => {
	const dispatch = useDispatch()
	const loggedUserId = useSelector(selectUserId)
	const loggedUser = useSelector((state) => selectUserById(state, loggedUserId))
	const loggedUsername = loggedUser?.username

	const confirmMessageSeen = (contact) => {
		const newMessages = allMessagesByLoggedUser
			.filter((message) => {
				return message.sender_id === contact.id
			})
			.map((message) => {
				return {
					...message,
					seen_status: true,
				}
			})

		dispatch(messagesSeen(newMessages))
	}

	return (
		<section className={styles.contactListContainer}>
			<header className={styles.contactListHead}>{loggedUsername}</header>
			<div className={styles.contactList}>
				{contacts?.map((contact) => (
					<SingleContact
						key={contact.id}
						contact={contact}
						setContact={setContact}
						confirmMessageSeen={confirmMessageSeen}
					/>
				))}
			</div>
		</section>
	)
}
export default Contacts
