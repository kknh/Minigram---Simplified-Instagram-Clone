import styles from './index.module.css'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUserId } from '../../../features/authSlice'
import { selectAllUsers } from '../../../features/usersSlice'
import {
	selectMessagesByUser,
	selectMessagesStatus,
} from '../../../features/messagesSlice'
import { API_STATUS } from '../../../api/apiStatus'
import Loading from '../../utils/loading'
import Contacts from '../../components/contacts'
import Messages from '../../components/messages'

const MessagesPage = () => {
	console.log('messages rendered')
	const messagesStatus = useSelector(selectMessagesStatus)
	const loggedUserId = useSelector(selectUserId)
	const allUsers = useSelector(selectAllUsers)
	const [contact, setContact] = useState(null)

	const allMessagesByLoggedUser = useSelector((state) =>
		selectMessagesByUser(state, loggedUserId)
	)

	const contacts = []
	allMessagesByLoggedUser.forEach((message) => {
		if (message.sender_id !== loggedUserId) {
			const contact = allUsers.find((user) => user.id === message.sender_id)
			if (contacts.includes(contact)) {
				return
			} else {
				contacts.push(contact)
			}
		} else if (message.receiver_id !== loggedUserId) {
			const contact = allUsers.find((user) => user.id === message.receiver_id)
			if (contacts.includes(contact)) {
				return
			} else {
				contacts.push(contact)
			}
		}
	})

	const LoadingSpinner =
		messagesStatus === API_STATUS.LOADING ? <Loading /> : ''

	return (
		<>
			<main className={styles.container}>
				{LoadingSpinner}
				<div className={styles.wrapper}>
					<Contacts
						contacts={contacts}
						setContact={setContact}
						allMessagesByLoggedUser={allMessagesByLoggedUser}
					/>
					<Messages
						contact={contact}
						allMessagesByLoggedUser={allMessagesByLoggedUser}
					/>
				</div>
			</main>
		</>
	)
}
export default MessagesPage
