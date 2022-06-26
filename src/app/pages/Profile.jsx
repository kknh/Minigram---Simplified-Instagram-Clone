import { useNavigate } from 'react-router-dom'

const Profile = () => {
	console.log('Profile rendered')
	const navigate = useNavigate()
	return (
		<div>
			Profile
			<button onClick={() => navigate('/')}>Home</button>
		</div>
	)
}
export default Profile
