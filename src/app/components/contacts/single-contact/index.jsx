import styles from './index.module.css'
import { useState } from 'react'

const SingleContact = ({ contact, setContact, confirmMessageSeen }) => {
	const [seenStatus, setSeenStatus] = useState(false)

	const onClickHandler = () => {
		setContact(contact)

		if (seenStatus) {
			return
		}

		setSeenStatus(true)
		confirmMessageSeen(contact)
	}

	return (
		<div
			className={styles.contactItem}
			key={contact.id}
			onClick={onClickHandler}
		>
			{contact.username}
		</div>
	)
}
export default SingleContact
