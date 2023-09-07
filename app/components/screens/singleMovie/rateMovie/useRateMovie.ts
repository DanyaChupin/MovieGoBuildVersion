import { useAuth } from '@/hooks/useAuth'
import { RatingService } from '@/services/rating.service'
import { toastError } from '@/utils/toastError'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export const useRateMovie = (movieId: string) => {
	const { user } = useAuth()
	const [rating, setRating] = useState(0)

	const [isSended, setIsSended] = useState(false)
	const { refetch } = useQuery(
		['your movie', movieId],
		() => RatingService.getByUserMovie(movieId),
		{
			onSuccess: ({ data }) => {
				setRating(data)
			},
			onError: (err) => {
				toastError(err, 'Get rating')
			},
			enabled: !!movieId && !!user,
		}
	)
	const { mutateAsync } = useMutation(
		['set rating movie'],
		({ value }: { value: number }) =>
			RatingService.setRating(movieId, value),
		{
			onSuccess: () => {
				setIsSended(true)
				refetch()

				setTimeout(() => {
					setIsSended(false)
				}, 2400)
			},
			onError: (err) => {
				toastError(err, 'Rate movie')
			},
		}
	)
	const handleClick = async (nextValue: number) => {
		setRating(nextValue)
		await mutateAsync({ value: nextValue })
	}
	return { isSended, rating, handleClick }
}
