import axios from 'axios'

const minigramApi = axios.create({
	baseURL: 'http://localhost:5000/',
})

export default minigramApi
