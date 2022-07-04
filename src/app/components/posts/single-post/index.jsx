import styles from './index.module.css'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { selectUserId } from '../../../../features/authSlice'
import { API_STATUS } from '../../../../api/apiStatus'
import {
	addComment,
	addLike,
	deletePost,
	selectPostById,
	selectPostsStatus,
} from '../../../../features/postsSlice'
import { selectUserById } from '../../../../features/usersSlice'

import SingleComment from './single-comment'
import { ReactComponent as Likes } from '../../../../assets/icons/likes.svg'
import { ReactComponent as LikesActive } from '../../../../assets/icons/likes-active.svg'
import SendMessage from './send-message'
import DeleteConfirmation from './delete-confirmation'

const Post = ({ id: postId, image_name: imageName }) => {
	console.log('Post rendered')
	const dispatch = useDispatch()
	const [comment, setComment] = useState('')
	const [buttonActive, setButtonActive] = useState('')
	const [showBtn, setShowBtn] = useState(false)
	const [showMsgModal, setShowMsgModal] = useState(false)
	const [showConfirmation, setShowConfirmation] = useState(false)
	const post = useSelector((state) => selectPostById(state, postId))
	const postUser = useSelector((state) => selectUserById(state, post.userId))
	const postUsername = postUser?.username
	const loggedUserId = useSelector(selectUserId)
	const postLiked = post.liked_by.includes(loggedUserId)
	const postStatus = useSelector(selectPostsStatus)

	const submitNewComment = (e) => {
		e.preventDefault()
		if (postStatus === API_STATUS.LOADING) return
		const postCopy = { ...post }
		dispatch(addComment({ comment, loggedUserId, postCopy }))
		setComment('')
		setButtonActive('')
	}

	const commentChangeHandler = (e) => {
		setComment(e.target.value)
		if (e.target.value.trim() === '') {
			setButtonActive('')
		} else {
			setButtonActive('active')
		}
	}

	const toggleLike = () => {
		if (postStatus === API_STATUS.LOADING) return
		const postCopy = { ...post }
		dispatch(addLike({ loggedUserId, postCopy, postLiked }))
	}

	const showBtnHandler = () => {
		setShowBtn(true)
	}
	const hideBtnHandler = () => {
		setShowBtn(false)
	}

	const sendMessageHandler = () => {
		setShowMsgModal(true)
		document.body.style.overflow = 'hidden'
	}

	const deletePostHandler = () => {
		if (postStatus === API_STATUS.LOADING) return
		dispatch(deletePost({ postId, imageName }))
	}

	return (
		<>
			<div
				className={styles.post}
				onMouseEnter={showBtnHandler}
				onMouseLeave={hideBtnHandler}
			>
				<button
					className={styles.messageBtn}
					style={{
						display: showBtn && post.userId !== loggedUserId ? 'block' : 'none',
					}}
					onClick={sendMessageHandler}
				>
					Send Message
				</button>
				<button
					className={styles.deleteBtn}
					style={{
						display: showBtn && post.userId === loggedUserId ? 'block' : 'none',
					}}
					onClick={() => setShowConfirmation(true)}
				>
					Delete Post
				</button>
				<div className={styles.user}>
					<h2>{postUsername}</h2>
				</div>
				<div className={styles.image}>
					<img src={post.image} alt={post.desc} />
				</div>
				<div className={styles.cta}>
					<Likes
						onClick={toggleLike}
						className={styles.likes}
						style={{ display: postLiked ? 'none' : 'block' }}
					/>
					<LikesActive
						onClick={toggleLike}
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
					<form onSubmit={submitNewComment}>
						<input
							onChange={commentChangeHandler}
							type="text"
							value={comment}
							name="comment"
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
			<DeleteConfirmation
				showConfirmation={showConfirmation}
				setShowConfirmation={setShowConfirmation}
				deletePostHandler={deletePostHandler}
			/>
		</>
	)
}
export default Post
