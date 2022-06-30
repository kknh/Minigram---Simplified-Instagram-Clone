import styles from './index.module.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	addMessage,
	selectMessagesStatus,
} from '../../../features/messagesSlice'
import { selectUserId } from '../../../features/authSlice'
import { API_STATUS } from '../../../api/apiStatus'

const MessageForm = ({ contact }) => {
	const dispatch = useDispatch()
	const loggedUserId = useSelector(selectUserId)
	const status = useSelector(selectMessagesStatus)
	const [message, setMessage] = useState('')

	const onSubmitMessageHandler = (e) => {
		e.preventDefault()
		if (status === API_STATUS.LOADING) return

		dispatch(
			addMessage({ message, sender_id: loggedUserId, receiver_id: contact.id })
		)

		setMessage('')
	}

	const onChangeHandler = (e) => {
		setMessage(e.target.value)
	}

	return (
		<form onSubmit={onSubmitMessageHandler} className={styles.form}>
			<input
				type="text"
				className={styles.input}
				value={message}
				onChange={onChangeHandler}
				placeholder="Message..."
				required
			/>
		</form>
	)
}
export default MessageForm
