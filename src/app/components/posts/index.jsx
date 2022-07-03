import styles from './index.module.css'
import { useSelector } from 'react-redux'
import {
	selectAllPosts,
	selectPostsError,
	selectPostsStatus,
} from '../../../features/postsSlice.js'
import SinglePost from './single-post'
import Loading from '../../utils/loading'
import { API_STATUS } from '../../../api/apiStatus'

const Feed = () => {
	console.log('Feed rendered')
	const posts = useSelector(selectAllPosts)
	const postsError = useSelector(selectPostsError)
	const postsStatus = useSelector(selectPostsStatus)

	const postList = posts.map((post) => {
		return <SinglePost key={post.id} {...post} />
	})

	if (postsError) {
		return <p>{postsError}</p>
	}

	const LoadingSpinner = postsStatus === API_STATUS.LOADING ? <Loading /> : ''

	return (
		<section className={styles.container}>
			{LoadingSpinner}
			<div className={styles.wrapper}>{postList}</div>
		</section>
	)
}
export default Feed
