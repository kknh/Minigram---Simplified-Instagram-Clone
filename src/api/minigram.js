import axios from 'axios'

const minigramApi = axios.create({
	baseURL: 'https://minigram-api.herokuapp.com/',
})

export default minigramApi
