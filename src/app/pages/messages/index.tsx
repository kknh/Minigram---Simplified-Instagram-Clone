import styles from './index.module.css'
import { useState } from 'react'
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
import { User } from '../../../../types'
import { useAppSelector } from '../../setup/hooks'

const MessagesPage = (): JSX.Element => {
	console.log('messages rendered')
	const messagesStatus = useAppSelector(selectMessagesStatus)
	const loggedUserId = useAppSelector(selectUserId)
	const allUsers = useAppSelector(selectAllUsers)
	const [contact, setContact] = useState<User | {}>({})

	const allMessagesByLoggedUser = useAppSelector((state) =>
		selectMessagesByUser(state, loggedUserId)
	)

	const contacts: User[] = []
	allMessagesByLoggedUser.forEach((message) => {
		if (message.sender_id !== loggedUserId) {
			const contact = allUsers.find((user) => user.id === message.sender_id)!
			if (contacts.includes(contact)) {
				return
			} else {
				contacts.push(contact)
			}
		} else if (message.receiver_id !== loggedUserId) {
			const contact = allUsers.find((user) => user.id === message.receiver_id)!
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
