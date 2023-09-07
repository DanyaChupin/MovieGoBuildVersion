import { FC, useEffect, useState } from 'react'
import { useFavorites } from '../../favorites/useFavorites'
import { useMutation } from '@tanstack/react-query'
import { UserService } from '@/services/user.service'
import { toastError } from '@/utils/toastError'
import cn from 'classnames'
import styles from './FavoriteButton.module.scss'
import { useAuth } from '@/hooks/useAuth'
import { toastr } from 'react-redux-toastr'

const FavoriteButton: FC<{ movieId: string }> = ({ movieId }) => {
	const [isSmashed, setIsSmashed] = useState(false)
	const { user } = useAuth()
	const notAutorization = () => {
		toastr.error('Rating movie', 'You not autorization!')
	}
	const { favoritesMovies, refetch } = useFavorites()

	useEffect(() => {
		const isHasMovie = favoritesMovies?.some((f) => f._id === movieId)
		if (isSmashed !== isHasMovie) setIsSmashed(!!isHasMovie)
	}, [favoritesMovies, isSmashed, movieId])

	const { mutateAsync } = useMutation(
		['update favorites'],
		() => UserService.toggleFavorite(movieId),
		{
			onSuccess: () => {
				setIsSmashed(!isSmashed)
				refetch()
			},
			onError: (err) => {
				toastError(err, 'Update favorites')
			},
		}
	)
	return (
		<button
			onClick={() => (user ? mutateAsync() : notAutorization())}
			className={cn(styles.button, { [styles.animate]: isSmashed })}
			style={{ backgroundImage: `url('/heart-animation.png')` }}
		/>
	)
}

export default FavoriteButton
