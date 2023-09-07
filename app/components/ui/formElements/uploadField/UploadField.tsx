import { FC } from 'react'
import { IUploadField } from '../form.interface'
import { useUpload } from './useUpload'
import cn from 'classnames'
import styles from '../form.module.scss'
import SkeletonLoader from '../../SkeletonLoader'
import Image from 'next/image'

const UploadField: FC<IUploadField> = ({
	onChange,
	placeholder,
	error,
	folder,
	isNoImage = false,
	style,
	value,
}) => {
	const { uploadFile, isLoading } = useUpload(onChange, folder)
	return (
		<div className={cn(styles.field, styles.uploadField)} style={style}>
			<div className={styles.uploadFlex}>
				<label>
					<span>{placeholder}</span>
					<input type="file" onChange={uploadFile} />
					{error && (
						<div className={styles.error}>
							{error.message}
						</div>
					)}
				</label>
				{!isNoImage && (
					<div className={styles.uploadImageContainer}>
						{isLoading ? (
							<SkeletonLoader
								count={1}
								className="w-full h-full"
							/>
						) : (
							value && (
								<Image
									alt=""
									src={value}
									layout="fill"
									unoptimized
								/>
							)
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default UploadField
