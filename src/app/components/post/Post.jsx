import styles from './Post.module.css'
import { nanoid } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { selectUserId } from '../../../features/authSlice'
import {
	addComment,
	selectPostById,
	selectPostsStatus,
} from '../../../features/postsSlice'
import { selectUserById } from '../../../features/usersSlice'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { API_STATUS } from '../../../constants/apiStatus'

import Comment from '../comment/Comment'
import { ReactComponent as Likes } from '../../../assets/icons/likes.svg'

const Post = ({ postId }) => {
	console.log('Post rendered')
	const dispatch = useDispatch()
	const [comment, setComment] = useState('')
	const [buttonActive, setButtonActive] = useState('')
	const post = useSelector((state) => selectPostById(state, postId))
	const user = useSelector((state) => selectUserById(state, post.userId))
	const loggedUser = useSelector(selectUserId)

	const postStatus = useSelector(selectPostsStatus)

	const onSubmitCommentHandler = (e) => {
		e.preventDefault()
		if (postStatus === API_STATUS.LOADING) return
		const postCopy = { ...post }
		dispatch(addComment({ comment, loggedUser, postCopy }))
		setComment('')
		setButtonActive('')
	}

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
				<h2>{user.username}</h2>
			</div>
			<div className={styles.image}>
				<img src={post.image} alt={post.desc} />
			</div>
			<div className={styles.cta}>
				<Likes className={styles.likes} />
			</div>
			<div className={styles.likesInfo}>{post.likes} likes</div>
			<div className={styles.comments}>
				{post.comments.map((comment) => (
					<Comment key={comment.id} {...comment} />
				))}
			</div>
			<p className={styles.date}>
				{formatDistanceToNow(parseISO(post.date))} ago
			</p>
			<div className={styles.addComment}>
				<form onSubmit={onSubmitCommentHandler}>
					<input
						onChange={onChangeHandler}
						type="text"
						value={comment}
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
