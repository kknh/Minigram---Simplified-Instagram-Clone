import Posts from '../../components/posts'
import Navbar from '../../components/navbar'

const Home = () => {
	console.log('Home rendered')
	return (
		<>
			<Navbar />
			<Posts />
		</>
	)
}
export default Home
