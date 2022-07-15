import styles from './index.module.css'
import { useState } from 'react'

const SingleContact = ({ contact, setContact, messagesAreSeen }) => {
	const [seenStatus, setSeenStatus] = useState(false)

	const setContactAndMessagesAreSeen = () => {
		setContact(contact)

		if (seenStatus) return

		setSeenStatus(true)
		messagesAreSeen(contact.id)
	}

	return (
		<div
			className={styles.contactItem}
			key={contact.id}
			onClick={setContactAndMessagesAreSeen}
		>
			{contact.username}
		</div>
	)
}
export default SingleContact
