import styles from './Feed.module.css'
import { useSelector } from 'react-redux'
import {
	selectAllPosts,
	selectPostsError,
} from '../../../features/postsSlice.js'
import Post from '../post/Post'

const Feed = () => {
	console.log('Feed rendered')
	const posts = useSelector(selectAllPosts)
	const postsError = useSelector(selectPostsError)

	const postList = posts.map((post) => {
		return <Post key={post.id} postId={post.id} />
	})

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
