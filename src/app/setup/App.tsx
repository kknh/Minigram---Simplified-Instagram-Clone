import './App.css'
import React from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '../utils/error-fallback'
import Home from '../pages/home'
import Signin from '../pages/login'
import RequireAuth from '../pages/require-auth'
import Messages from '../pages/messages'
import Navbar from '../components/navbar'
import SignUp from '../pages/sign-up'
function App() {
	console.log('App rendered')
	const navigate = useNavigate()
	return (
		<>
			<ErrorBoundary
				FallbackComponent={ErrorFallback}
				onReset={() => {
					navigate(-1)
				}}
			>
				<Routes>
					<Route element={<RequireAuth />}>
						<Route path="/" element={<Navbar />}>
							<Route index element={<Home />} />
							<Route path="messages" element={<Messages />} />
						</Route>
					</Route>

					<Route path="login" element={<Signin />} />
					<Route path="signup" element={<SignUp />} />

					<Route path="*" element={<Navigate to="/login" />} />
				</Routes>
				<ToastContainer />
			</ErrorBoundary>
		</>
	)
}

export default App
