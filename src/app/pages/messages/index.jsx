import styles from './index.module.css'
import { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserId } from '../../../features/authSlice'
import { selectAllUsers, selectUserById } from '../../../features/usersSlice'
import { selectAllMessages } from '../../../features/messagesSlice'
import SingleMessage from '../../components/single-message/'
import MessageForm from '../../components/message-form'
import Navbar from '../../components/navbar'

const Messages = () => {
	console.log('messages rendered')
	const loggedUserId = useSelector(selectUserId)
	const allUsers = useSelector(selectAllUsers)
	const loggedUser = useSelector((state) => selectUserById(state, loggedUserId))
	const loggedUserName = loggedUser?.username
	const allMessages = useSelector(selectAllMessages)
	const [contact, setContact] = useState({})
	const [messagesToShow, setMessagesToShow] = useState([])

	console.log('messagesToShow1', messagesToShow)
	console.log('allMessages1', allMessages)
	const allMessagesByUser = allMessages.filter(
		(message) =>
			message.senderId === loggedUserId || message.receiverId === loggedUserId
	)
	const contactsIdList = new Set(
		allMessagesByUser.map((message) => {
			if (message.senderId !== loggedUserId) {
				return message.senderId
			} else return message.receiverId
		})
	)
	let contactsNameAndIdList = []
	contactsIdList.forEach((id) => {
		const user = allUsers.find((user) => user.id === id)
		if (user) {
			contactsNameAndIdList.push({ username: user.username, id: id })
		} else return
	})

	const showMessages = (contactId) => {
		const messagesToShow = allMessagesByUser.filter(
			(msg) => msg.receiverId === contactId || msg.senderId === contactId
		)
		console.log('messagesToShow2', messagesToShow)
		console.log('allMessages2', allMessages)

		setMessagesToShow(messagesToShow)
	}

	// const showMessages = useCallback(
	// 	(contactId) => {
	// 		const messagesToShow = allMessagesByUser.filter(
	// 			(msg) => msg.receiverId === contactId || msg.senderId === contactId
	// 		)
	// 		console.log('messagesToShow2', messagesToShow)
	// 		console.log('allMessages2', allMessages)

	// 		setMessagesToShow(messagesToShow)
	// 	},
	// 	[allMessages, allMessagesByUser]
	// )

	// useEffect(() => {
	// 	showMessages(contact.id)
	// }, [contact.id, showMessages])

	const onClickContact = (contactId, contactName) => {
		showMessages(contactId)
		setContact({ id: contactId, username: contactName })
	}

	return (
		<>
			<Navbar />
			<main className={styles.container}>
				<div className={styles.wrapper}>
					<section className={styles.contactListContainer}>
						<header className={styles.contactListHead}>{loggedUserName}</header>
						<div className={styles.contactList}>
							{contactsNameAndIdList.map((contact) => (
								<div
									key={contact.id}
									onClick={() => onClickContact(contact.id, contact.username)}
									className={styles.contactItem}
								>
									{contact.username}
								</div>
							))}
						</div>
					</section>
					<section className={styles.messagesContainer}>
						<header className={styles.messagesHead}>
							{contact.contactName}
						</header>
						<div className={styles.messages}>
							{messagesToShow.map((message) => (
								<SingleMessage
									key={message.id}
									message={message}
									contact={contact}
									loggedUserId={loggedUserId}
									loggedUserName={loggedUserName}
								/>
							))}
						</div>
						<MessageForm
							loggedUserId={loggedUserId}
							contact={contact}
							showMessages={showMessages}
						/>
					</section>
				</div>
			</main>
		</>
	)
}
export default Messages
