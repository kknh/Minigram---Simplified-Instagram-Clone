import Posts from '../../components/posts'
import { useNavigate } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '../../utils/error-fallback'
const Home = () => {
	console.log('Home rendered')
	const navigate = useNavigate()

	return (
		<>
			<ErrorBoundary
				FallbackComponent={ErrorFallback}
				onReset={() => {
					navigate(-1)
				}}
			>
				<Posts />
			</ErrorBoundary>
		</>
	)
}
export default Home
