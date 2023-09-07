import { useState } from 'react'

export const useSlider = (length: number) => {
	const [currentIdx, setCurrentIdx] = useState(0)
	const [sliderIn, setSliderIn] = useState(true)

	const isExistsNext = currentIdx + 1 < length
	const isExistsPrev = currentIdx ? currentIdx - 1 < length : false

	const handleArrowClick = (direction: 'next' | 'prev') => {
		const newIndex =
			direction === 'next' ? currentIdx + 1 : currentIdx - 1
		setSliderIn(false)

		setTimeout(() => {
			setCurrentIdx(newIndex)
			setSliderIn(true)
		}, 300)
	}

	return {
		sliderIn,
		index: currentIdx,
		isNext: isExistsNext,
		isPrev: isExistsPrev,
		handleClick: handleArrowClick,
	}
}
