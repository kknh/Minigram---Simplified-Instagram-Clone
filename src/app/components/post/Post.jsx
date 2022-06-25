import styles from './Post.module.css'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { selectPostById } from '../../../features/feedSlice'
import { formatDistanceToNow, parseISO } from 'date-fns'

import { ReactComponent as Inbox } from '../../../assets/icons/inbox.svg'
import { ReactComponent as Likes } from '../../../assets/icons/likes.svg'

const Post = ({ postId }) => {
	const [comment, setComment] = useState('')
	const [buttonActive, setButtonActive] = useState('')
	const post = useSelector((state) => selectPostById(state, postId))
	const comm = post.comments

	const onChangeHandler = (e) => {
		setComment(e.target.value)
		if (e.target.value.trim() === '') {
			setButtonActive('')
		} else {
			setButtonActive('active')
		}
	}

	return (
		<div className={styles.post}>
			<div className={styles.user}>
				<h2>{post.userId}</h2>
			</div>
			<div className={styles.image}>
				<img src={post.image} alt={post.desc} />
			</div>
			<div className={styles.cta}>
				<Likes className={styles.likes} />
				<Inbox className={styles.sendMessage} />
			</div>
			<div className={styles.likesInfo}>{post.likes} likes</div>
			<div className={styles.comments}>
				{comm.map((c) => (
					<div className={styles.comment} key={c.id}>
						<p>
							<span className={styles.commentUser}>{c.userId}</span>{' '}
							<span>{c.comment}</span>{' '}
						</p>
					</div>
				))}
			</div>
			<p className={styles.date}>
				{formatDistanceToNow(parseISO(post.date))} ago
			</p>
			<div className={styles.addComment}>
				<form>
					<input
						onChange={onChangeHandler}
						type="text"
						placeholder="Add a comment..."
					/>
					<button
						disabled={!buttonActive}
						className={styles[buttonActive]}
						type="submit"
					>
						Post
					</button>
				</form>
			</div>
		</div>
	)
}
export default Post
