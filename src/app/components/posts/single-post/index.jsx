import styles from './index.module.css'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { selectUserId } from '../../../../features/authSlice'
import { API_STATUS } from '../../../../api/apiStatus'
import {
	addComment,
	addLike,
	selectPostById,
	selectPostsStatus,
} from '../../../../features/postsSlice'
import { selectUserById } from '../../../../features/usersSlice'

import SingleComment from './single-comment'
import { ReactComponent as Likes } from '../../../../assets/icons/likes.svg'
import { ReactComponent as LikesActive } from '../../../../assets/icons/likes-active.svg'
import SendMessage from './send-message'

const Post = ({ postId }) => {
	console.log('Post rendered')
	const dispatch = useDispatch()
	const [comment, setComment] = useState('')
	const [buttonActive, setButtonActive] = useState('')
	const [showMsgBtn, setShowMsgBtn] = useState(false)
	const [showMsgModal, setShowMsgModal] = useState(false)
	const post = useSelector((state) => selectPostById(state, postId))
	const postUser = useSelector((state) => selectUserById(state, post.userId))
	const postUsername = postUser?.username
	const loggedUserId = useSelector(selectUserId)
	const postLiked = post.liked_by.includes(loggedUserId)
	const postStatus = useSelector(selectPostsStatus)

	const onSubmitCommentHandler = (e) => {
		e.preventDefault()
		if (postStatus === API_STATUS.LOADING) return
		const postCopy = { ...post }
		dispatch(addComment({ comment, loggedUserId, postCopy }))
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

	const onClickAddLikeHandler = () => {
		if (postStatus === API_STATUS.LOADING) return
		const postCopy = { ...post }
		dispatch(addLike({ loggedUserId, postCopy, postLiked }))
	}

	const onShowMsgBtn = () => {
		setShowMsgBtn(true)
	}
	const onHideMsgBtn = () => {
		setShowMsgBtn(false)
	}

	const onClickSendMessage = () => {
		setShowMsgModal(true)
		document.body.style.overflow = 'hidden'
	}

	return (
		<>
			<div
				className={styles.post}
				onMouseEnter={onShowMsgBtn}
				onMouseLeave={onHideMsgBtn}
			>
				<button
					className={styles.messageBtn}
					style={{
						display:
							showMsgBtn && post.userId !== loggedUserId ? 'block' : 'none',
					}}
					onClick={onClickSendMessage}
				>
					Send Message
				</button>
				<div className={styles.user}>
					<h2>{postUsername}</h2>
				</div>
				<div className={styles.image}>
					<img src={post.image} alt={post.desc} />
				</div>
				<div className={styles.cta}>
					<Likes
						onClick={onClickAddLikeHandler}
						className={styles.likes}
						style={{ display: postLiked ? 'none' : 'block' }}
					/>
					<LikesActive
						onClick={onClickAddLikeHandler}
						className={styles.likes}
						style={{ display: postLiked ? 'block' : 'none' }}
					/>
				</div>
				<div className={styles.likesInfo}>{post.liked_by.length} likes</div>
				<div className={styles.comments}>
					{post.comments.map((comment) => (
						<SingleComment key={comment.id} {...comment} post={post} />
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
			<SendMessage
				post={post}
				showMsgModal={showMsgModal}
				setShowMsgModal={setShowMsgModal}
				postUsername={postUsername}
			/>
		</>
	)
}
export default Post
