import styles from './Comment.module.css'
import { useSelector } from 'react-redux'
import { selectUserById } from '../../../features/usersSlice'

const Comment = ({ userId, comment }) => {
	const user = useSelector((state) => selectUserById(state, userId))
	return (
		<div className={styles.comment}>
			<p>
				<span className={styles.commentUser}>{user.username}</span>{' '}
				<span>{comment}</span>{' '}
			</p>
		</div>
	)
}
export default Comment
