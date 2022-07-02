import './App.css'
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from '../pages/home'
import Signin from '../pages/login'
import RequireAuth from '../pages/require-auth'
import Messages from '../pages/messages'
import Navbar from '../components/navbar'

function App() {
	console.log('App rendered')

	return (
		<>
			<Routes>
				<Route element={<RequireAuth />}>
					<Route path="/" element={<Navbar />}>
						<Route index element={<Home />} />
						<Route path="messages" element={<Messages />} />
					</Route>
				</Route>

				<Route path="login" element={<Signin />} />

				<Route path="*" element={<Navigate to="/login" />} />
			</Routes>
			<ToastContainer />
		</>
	)
}

export default App
