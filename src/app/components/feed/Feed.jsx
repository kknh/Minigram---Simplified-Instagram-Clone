import styles from './Feed.module.css'
import { useSelector } from 'react-redux'
import { selectAllPosts } from '../../../features/feed/feedSlice'
import Post from '../post/Post'

const Feed = () => {
	const posts = useSelector(selectAllPosts)
	const postList = posts.map((post) => <Post key={post.id} postId={post.id} />)
	console.log('posts', posts)
	return (
		<section className={styles.container}>
			<div className={styles.wrapper}>{postList}</div>
		</section>
	)
}
export default Feed
