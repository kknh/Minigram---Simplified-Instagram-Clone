import styles from './index.module.css'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signOutUser, selectUserId } from '../../../features/authSlice'
import { selectUserById } from '../../../features/usersSlice'
import { selectMessagesByUser } from '../../../features/messagesSlice'
import { ReactComponent as Home } from '../../../assets/icons/home.svg'
import { ReactComponent as Inbox } from '../../../assets/icons/inbox.svg'
import { ReactComponent as NewPost } from '../../../assets/icons/new-post.svg'
import AddPost from './add-post'

const Navbar = () => {
	console.log('Navbar rendered')
	const dispatch = useDispatch()
	const [showUserMenuDropdown, setShowUserMenuDropdown] = useState(false)
	const [showPostModal, setShowPostModal] = useState(false)

	const loggedUserId = useSelector(selectUserId)
	const loggedUser = useSelector((state) => selectUserById(state, loggedUserId))
	const loggedUsername = loggedUser?.username
	const messagesByLoggedUser = useSelector((state) =>
		selectMessagesByUser(state, loggedUserId)
	)
	const unseenMessagesCount = messagesByLoggedUser.filter(
		(message) =>
			message.receiver_id === loggedUserId && message.seen_status === false
	).length

	const signOutHandler = () => {
		dispatch(signOutUser())
	}

	const openPostModal = () => {
		setShowPostModal(true)
		document.body.style.overflow = 'hidden'
	}

	return (
		<>
			<nav className={styles.container}>
				<div className={styles.wrapper}>
					<div className={styles.logo}>Minigram</div>
					<ul className={styles.links}>
						<li>
							<Link to="/">
								<Home />
							</Link>
						</li>
						<li>
							<Link to="/messages">
								<div className={styles.inboxIcon}>
									<Inbox />
									<div className={styles.inboxCount}>{unseenMessagesCount}</div>
								</div>
							</Link>
						</li>
						<li>
							<NewPost onClick={openPostModal} />
						</li>
						<li>
							<div
								className={styles.userMenu}
								onClick={() => setShowUserMenuDropdown((prev) => !prev)}
							>
								<div className={styles.user}>
									<span>Welcome,</span> <span> {loggedUsername}! </span>
								</div>
								<div
									className={styles.userMenuDropdown}
									style={{ display: showUserMenuDropdown ? 'flex' : 'none' }}
								>
									<Link to="/login" onClick={signOutHandler}>
										Logout
									</Link>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</nav>
			<AddPost
				showPostModal={showPostModal}
				setShowPostModal={setShowPostModal}
			/>
			<Outlet />
		</>
	)
}
export default Navbar
