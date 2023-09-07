import { MovieService } from '@/services/movie.service'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useUpdateCountOpened = (slug: string) => {
	const { mutateAsync } = useMutation(['update count opened'], () =>
		MovieService.updateCountOpened(slug)
	)
	useEffect(() => {
		mutateAsync()
	}, [])
}
