import axios from 'axios'

const minigramApi = axios.create({
	baseURL: 'http://localhost:3000/',
})

export default minigramApi
