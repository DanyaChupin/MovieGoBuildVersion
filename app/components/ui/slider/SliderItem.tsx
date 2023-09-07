import { FC } from 'react'
import { ISlide } from './slider.interface'
import styles from './Slider.module.scss'
import { useRouter } from 'next/router'
import Image from 'next/image'

interface ISlideItem {
	slide: ISlide
	buttonTitle?: string
}

const SliderItem: FC<ISlideItem> = ({ slide, buttonTitle = 'Watch' }) => {
	const { push } = useRouter()

	return (
		<div className={styles.slide}>
			{slide.bigPoster && (
				<Image
					className={styles.image}
					alt={slide.title}
					draggable={false}
					src={slide.bigPoster}
					unoptimized
					priority
					layout="fill"
				/>
			)}
			<div className={styles.content}>
				<div className={styles.heading}>{slide.title}</div>
				<div className={styles.subHeading}>{slide.subTitle}</div>
				<button
					className={styles.button}
					onClick={() => push(slide.link)}
				>
					{buttonTitle}
				</button>
			</div>
		</div>
	)
}

export default SliderItem
