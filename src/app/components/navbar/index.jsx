import styles from './index.module.css'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signOutUser, selectUserId } from '../../../features/authSlice'
import { selectMessagesByUser } from '../../../features/messagesSlice'
import { ReactComponent as Home } from '../../../assets/icons/home.svg'
import { ReactComponent as Inbox } from '../../../assets/icons/inbox.svg'
import { ReactComponent as NewPost } from '../../../assets/icons/new-post.svg'
import { ReactComponent as Activity } from '../../../assets/icons/activity.svg'
import AddPost from '../add-post'

const Navbar = () => {
	console.log('Navbar rendered')
	const dispatch = useDispatch()
	const [showProfileDropdown, setShowProfileDropdown] = useState(false)
	const [showPostModal, setShowPostModal] = useState(false)

	const loggedUserId = useSelector(selectUserId)
	const messagesByLoggedUser = useSelector((state) =>
		selectMessagesByUser(state, loggedUserId)
	)
	const unseenMessages = messagesByLoggedUser.filter(
		(message) =>
			message.receiver_id === loggedUserId && message.seen_status === false
	).length

	const onSignOutHandler = () => {
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
					<div className={styles.searchContainer}>
						<form>
							<input
								className={styles.searchInput}
								name="search"
								placeholder="search"
							/>
						</form>
					</div>
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
									<div className={styles.inboxCount}>{unseenMessages}</div>
								</div>
							</Link>
						</li>
						<li>
							<NewPost onClick={openPostModal} />
						</li>
						<li>
							<Link to="/">
								<Activity />
							</Link>
						</li>
						<li>
							<div className={styles.profile}>
								<img
									onClick={() => setShowProfileDropdown((prev) => !prev)}
									className={styles.profileImg}
									src="./images/profile_kunho.jpg"
									alt="kunho profile"
								/>
								<div
									className={styles.profileDropdown}
									style={{ display: showProfileDropdown ? 'flex' : 'none' }}
								>
									<Link to="/profile">Profile</Link>
									<Link to="/login" onClick={onSignOutHandler}>
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
