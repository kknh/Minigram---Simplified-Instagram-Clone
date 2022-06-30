import './App.css'
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from '../pages/home'
import Signin from '../pages/login'
import RequireAuth from '../pages/require-auth'
import Profile from '../pages/profile'
import Messages from '../pages/messages'

function App() {
	console.log('App rendered')

	return (
		<>
			{/* <Routes>
				<Route element={<RequireAuth />}>
					<Route path="/" element={<Home />} />
				</Route>
				<Route element={<RequireAuth />}>
					<Route path="/profile" element={<Profile />} />
				</Route>

				<Route path="login" element={<Signin />} />
				<Route path="*" element={<Navigate to="/login" />} />
			</Routes>
			<ToastContainer /> */}
			<Messages />
		</>
	)
}

export default App
