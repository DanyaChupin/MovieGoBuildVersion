import { FC } from 'react'
import cn from 'classnames'
import styles from './SliderArrow.module.scss'
import MaterialIcon from '../../MaterialIcon'

interface ISliderArrow {
	variant: 'left' | 'right'
	clickHandler: () => void
}
const SliderArrow: FC<ISliderArrow> = ({ clickHandler, variant }) => {
	const isLeft = variant === 'left'
	return (
		<button
			onClick={clickHandler}
			className={cn(styles.arrow, {
				[styles.left]: isLeft,
				[styles.right]: !isLeft,
			})}
			aria-label={isLeft ? 'previous slide' : 'next slide'}
		>
			<MaterialIcon
				name={isLeft ? 'MdChevronLeft' : 'MdChevronRight'}
			/>
		</button>
	)
}

export default SliderArrow
