import styles from './index.module.css'

const SelectImage = ({ setImageSrc }) => {
	const readFile = (file) => {
		return new Promise((resolve) => {
			const reader = new FileReader()
			reader.addEventListener('load', () => resolve(reader.result), false)
			reader.readAsDataURL(file)
		})
	}

	const onFileChange = async (e) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0]
			let imageDataUrl = await readFile(file)

			setImageSrc(imageDataUrl)
		}
	}

	return (
		<form className={styles.form}>
			<label className={styles.label} htmlFor="image">
				{' '}
				Select from computer
				<input
					onChange={onFileChange}
					className={styles.input}
					id="image"
					type="file"
					accept="image/*"
				/>
			</label>
		</form>
	)
}
export default SelectImage
