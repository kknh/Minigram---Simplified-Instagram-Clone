import styles from './index.module.css'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUserId } from '../../../features/authSlice'
import { selectAllUsers } from '../../../features/usersSlice'
import { selectMessagesByUser } from '../../../features/messagesSlice'
import Contacts from '../../components/contacts'
import Messages from '../../components/messages'
const MessagesPage = () => {
	console.log('messages rendered')

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

	return (
		<>
			<main className={styles.container}>
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
