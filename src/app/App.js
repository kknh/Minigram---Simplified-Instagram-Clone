import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route exact path="/" element={<Home />} />
			</Routes>
		</>
	)
}

export default App
