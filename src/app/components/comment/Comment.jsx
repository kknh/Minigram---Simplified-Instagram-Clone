import styles from './Comment.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserById } from '../../../features/usersSlice'
import { useState } from 'react'
import { API_STATUS } from '../../../constants/apiStatus'
import { deleteComment, selectPostsStatus } from '../../../features/postsSlice'

const Comment = ({ userId, comment, id, post }) => {
	const dispatch = useDispatch()
	const user = useSelector((state) => selectUserById(state, userId))
	const [showDelete, setShowDelete] = useState(false)
	const postStatus = useSelector(selectPostsStatus)

	const onMouseEnterHandler = () => {
		setShowDelete(true)
	}
	const onMouseLeaveHandler = () => {
		setShowDelete(false)
	}
	const onClickCommentHandler = () => {
		setShowDelete((prev) => !prev)
	}

	const onDeleteCommentHandler = () => {
		if (postStatus === API_STATUS.LOADING) return
		const postCopy = { ...post }
		dispatch(deleteComment({ postCopy, id }))
	}

	return (
		<div
			onMouseEnter={onMouseEnterHandler}
			onMouseLeave={onMouseLeaveHandler}
			onClick={onClickCommentHandler} // for mobile users
			className={styles.comment}
		>
			<span className={styles.commentUser}>{user.username}</span>{' '}
			<span className={styles.commentText}>{comment}</span>
			<span
				onClick={onDeleteCommentHandler}
				className={styles.commentDelete}
				style={{ display: showDelete ? 'inline' : 'none' }}
			>
				delete
			</span>
		</div>
	)
}
export default Comment
