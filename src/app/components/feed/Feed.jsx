import styles from './Feed.module.css'
import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { API_STATUS } from '../../../constants/apiStatus'
import {
	fetchPosts,
	selectAllPosts,
	selectPostsStatus,
	selectPostsError,
} from '../../../features/postsSlice.js'
import Post from '../post/Post'
import Loading from '../../utils/Loading'

const Feed = () => {
	console.log('Feed rendered')
	const dispatch = useDispatch()
	const posts = useSelector(selectAllPosts)
	const postsStatus = useSelector(selectPostsStatus)
	const postsError = useSelector(selectPostsError)

	useEffect(() => {
		dispatch(fetchPosts())
	}, [dispatch])

	const postList = posts.map((post) => {
		return <Post key={post.id} postId={post.id} />
	})

	if (postsStatus === API_STATUS.LOADING) {
		return <Loading />
	}

	if (postsError) {
		return <p>{postsError}</p>
	}

	return (
		<section className={styles.container}>
			<div className={styles.wrapper}>{postList}</div>
		</section>
	)
}
export default Feed
