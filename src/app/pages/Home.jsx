import Feed from '../components/feed/Feed'
import Navbar from '../components/navbar/Navbar'

const Home = () => {
	console.log('Home rendered')
	return (
		<>
			<Navbar />
			<Feed />
		</>
	)
}
export default Home
