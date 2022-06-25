import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Signin from './pages/Signin'

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Navbar />}>
					<Route path="/" element={<Home />} />
				</Route>
				<Route path="login" element={<Signin />} />
			</Routes>
		</>
	)
}

export default App
