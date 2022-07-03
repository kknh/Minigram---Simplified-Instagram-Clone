import styles from './index.module.css'
import { useSelector } from 'react-redux'
import {
	selectAllPosts,
	selectPostsStatus,
} from '../../../features/postsSlice.js'
import SinglePost from './single-post'
import Loading from '../../utils/loading'
import { API_STATUS } from '../../../api/apiStatus'

const Posts = () => {
	console.log('Feed rendered')
	const posts = useSelector(selectAllPosts)
	const postsStatus = useSelector(selectPostsStatus)
	const postList = posts.map((post) => {
		return <SinglePost key={post.id} {...post} />
	})
	const LoadingSpinner = postsStatus === API_STATUS.LOADING ? <Loading /> : ''

	return (
		<section className={styles.container}>
			{LoadingSpinner}
			<div className={styles.wrapper}>{postList}</div>
		</section>
	)
}
export default Posts
