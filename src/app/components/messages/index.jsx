import styles from './index.module.css'
import SingleMessage from './single-message'
import MessageForm from './message-form'

const Messages = ({ contact, allMessagesByLoggedUser }) => {
	console.log('messages contact', contact)

	if (!contact) {
		return
	}

	const messagesToShow = allMessagesByLoggedUser.filter((message) => {
		return (
			message.sender_id === contact.id || message.receiver_id === contact.id
		)
	})

	return (
		<section className={styles.messagesContainer}>
			<header className={styles.messagesHead}>{contact?.username}</header>
			<div className={styles.messages}>
				{messagesToShow.map((message) => (
					<SingleMessage key={message.id} message={message} contact={contact} />
				))}
			</div>
			<MessageForm contact={contact} />
		</section>
	)
}
export default Messages
