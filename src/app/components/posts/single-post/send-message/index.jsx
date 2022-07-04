import styles from './index.module.css'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserId } from '../../../../../features/authSlice'
import {
	selectMessagesStatus,
	addMessage,
} from '../../../../../features/messagesSlice'
import { API_STATUS } from '../../../../../api/apiStatus'
import { toast } from 'react-toastify'

const SendMessage = ({ post, postUsername, showMsgModal, setShowMsgModal }) => {
	const dispatch = useDispatch()
	const postUserId = post.userId
	const loggedUserId = useSelector(selectUserId)
	const [message, setMessage] = useState('')
	const messagesStatus = useSelector(selectMessagesStatus)

	const changeHandler = (e) => {
		setMessage(e.target.value)
	}

	const closeModal = (e) => {
		if (e.target.closest('#dialog')) {
			return
		}
		setMessage('')
		setShowMsgModal(false)
		document.body.style.overflow = 'visible'
	}

	const submitMessage = (e) => {
		e.preventDefault()
		if (messagesStatus === API_STATUS.LOADING) {
			return
		}

		if (message.trim() === '') {
			toast.error('Message cannot be empty!')
			return
		}

		dispatch(
			addMessage({ sender_id: loggedUserId, receiver_id: postUserId, message })
		)
		setMessage('')
		setShowMsgModal(false)
		document.body.style.overflow = 'visible'
	}

	return (
		<article
			className={styles.container}
			style={{ display: showMsgModal ? 'flex' : 'none' }}
			onClick={closeModal}
		>
			<div id="dialog" className={styles.wrapper}>
				<div className={styles.heading}>
					<h3>Message To:</h3>
					<span>{postUsername}</span>
				</div>
				<form onSubmit={submitMessage} className={styles.form}>
					<textarea
						value={message}
						name="message"
						onChange={changeHandler}
						className={styles.message}
						placeholder="Your message..."
						autoFocus
					/>
					<input
						type="submit"
						value="Send"
						id="send"
						className={styles.sendBtn}
					/>
				</form>
			</div>
			<button className={styles.closeModalBtn}>✖</button>
		</article>
	)
}
export default SendMessage
