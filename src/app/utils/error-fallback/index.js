const ErrorFallback = ({ error, resetErrorBoundary }) => {
	return (
		<div role="alert">
			<p>Something went wrong:</p>
			<pre>{error.message}</pre>
			<button onClick={resetErrorBoundary}>Go back</button>
		</div>
	)
}
export default ErrorFallback
