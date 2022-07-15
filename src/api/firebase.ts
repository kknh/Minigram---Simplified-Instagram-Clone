import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: 'mim-97954.firebaseapp.com',
	projectId: 'mim-97954',
	storageBucket: 'mim-97954.appspot.com',
	messagingSenderId: '150898623289',
	appId: '1:150898623289:web:f3b5e984e516e1def69ee8',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const storage = getStorage(app)
