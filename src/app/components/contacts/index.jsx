import styles from './index.module.css'
import { useSelector } from 'react-redux'
import { selectUserById } from '../../../features/usersSlice'
import { selectUserId } from '../../../features/authSlice'

const Contacts = ({ contacts, setContact }) => {
	const loggedUserId = useSelector(selectUserId)
	const loggedUser = useSelector((state) => selectUserById(state, loggedUserId))
	const loggedUsername = loggedUser?.username

	const onClickContact = (contact) => {
		console.log('contact is', contact)
		setContact(contact)
	}

	return (
		<section className={styles.contactListContainer}>
			<header className={styles.contactListHead}>{loggedUsername}</header>
			<div className={styles.contactList}>
				{contacts?.map((contact) => (
					<div
						className={styles.contactItem}
						key={contact.id}
						onClick={() => onClickContact(contact)}
					>
						{contact.username}
					</div>
				))}
			</div>
		</section>
	)
}
export default Contacts
