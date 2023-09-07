import { FC, useRef } from 'react'
import { ISlide } from './slider.interface'
import { useSlider } from './useSlider'
import styles from './Slider.module.scss'
import SliderArrow from './slideArrow/SliderArrow'
import SliderItem from './SliderItem'
import { CSSTransition } from 'react-transition-group'

interface ISlider {
	slides: ISlide[]
	buttonType?: string
}

const Slider: FC<ISlider> = ({ slides, buttonType }) => {
	const { handleClick, index, isNext, isPrev, sliderIn } = useSlider(
		slides.length
	)

	return (
		<div className={styles.slider}>
			{isPrev && (
				<SliderArrow
					variant="left"
					clickHandler={() => handleClick('prev')}
				/>
			)}
			<CSSTransition
				in={sliderIn}
				classNames="slide-animation"
				timeout={300}
				unmountOnExit
			>
				<SliderItem
					slide={slides[index]}
					buttonTitle={buttonType}
				/>
			</CSSTransition>
			{isNext && (
				<SliderArrow
					variant="right"
					clickHandler={() => handleClick('next')}
				/>
			)}
		</div>
	)
}

export default Slider
