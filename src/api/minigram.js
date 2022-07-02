import axios from 'axios'

const minigramApi = axios.create({
	baseURL: 'http://localhost:5000/',
	// baseURL: 'https://minigram-api.herokuapp.com/',
})

export default minigramApi
