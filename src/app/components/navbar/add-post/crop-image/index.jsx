import styles from './index.module.css'
import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'

const CropImage = ({ imageSrc, setCroppedAreaPixels }) => {
	const [crop, setCrop] = useState({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)

	const onCropComplete = useCallback(
		(croppedArea, croppedAreaPixels) => {
			setCroppedAreaPixels(croppedAreaPixels)
		},
		[setCroppedAreaPixels]
	)

	const onZoomChange = (zoom) => {
		setZoom(zoom)
	}

	return (
		<>
			<div className={styles.cropContainer}>
				<Cropper
					image={imageSrc}
					crop={crop}
					zoom={zoom}
					aspect={4 / 4}
					onCropChange={setCrop}
					onCropComplete={onCropComplete}
					onZoomChange={onZoomChange}
				/>
				<div className={styles.controls}>
					<input
						type="range"
						min={1}
						max={3}
						step={0.1}
						value={zoom}
						onInput={(e) => {
							onZoomChange(e.target.value)
						}}
						className={styles.slider}
					></input>
				</div>
			</div>
		</>
	)
}
export default CropImage
