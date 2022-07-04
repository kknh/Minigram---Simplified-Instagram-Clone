import './index.css'
import reportWebVitals from './reportWebVitals'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/setup/store'
import App from './app/setup/App'

import { fetchMessages } from './features/messagesSlice'
import { fetchUsers } from './features/usersSlice'
import { fetchPosts } from './features/postsSlice'

/// for testing ////
store.dispatch(fetchMessages())
store.dispatch(fetchUsers())
store.dispatch(fetchPosts())
//////////////////////////////

const container = document.getElementById('root')
const root = createRoot(container)

console.log('index rendered')

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
