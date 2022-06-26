import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Signin from './pages/Signin'
import RequireAuth from './pages/RequireAuth'
import Profile from './pages/Profile'

function App() {
	console.log('App rendered')
	return (
		<>
			<Routes>
				<Route element={<RequireAuth />}>
					<Route path="/" element={<Home />} />
				</Route>
				<Route element={<RequireAuth />}>
					<Route path="/profile" element={<Profile />} />
				</Route>

				<Route path="login" element={<Signin />} />
				<Route path="*" element={<Navigate to="/login" />} />
			</Routes>
		</>
	)
}

export default App
