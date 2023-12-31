import { getAdminUrl } from '@/config/url.config'
import { useDebounce } from '@/hooks/useDebounce'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastError } from '@/utils/toastError'
import { toastr } from 'react-redux-toastr'
import { ITableItem } from '@/components/ui/adminTable/AdminTable.interface'
import { getGenresList } from '@/utils/movie/getGenresList'
import { MovieService } from '@/services/movie.service'
import { useRouter } from 'next/router'

export const useMovies = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['movie list', debouncedSearch],
		() => MovieService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(movie): ITableItem => ({
						_id: movie._id,
						editUrl: getAdminUrl(`movie/edit/${movie._id}`),
						items: [
							movie.title,
							getGenresList(movie.genres),
							String(movie.rating),
						],
					})
				),
			onError(error) {
				toastError(error, 'Movie list')
			},
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}
	const { push } = useRouter()
	const { mutateAsync: createAsync } = useMutation(
		['create movie'],
		() => MovieService.create(),
		{
			onError(error) {
				toastError(error, 'Create movie')
			},
			onSuccess({ data: _id }) {
				toastr.success('Create movie', 'create was successful')
				push(getAdminUrl(`movie/edit/${_id}`))
			},
		}
	)
	const { mutateAsync: deleteAsync } = useMutation(
		['delete movie'],
		(movieId: string) => MovieService.delete(movieId),
		{
			onError(error) {
				toastError(error, 'Delete movie')
			},
			onSuccess() {
				toastr.success('Delete movie', 'Delete was successful')
				queryData.refetch()
			},
		}
	)

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
			createAsync,
		}),
		[queryData, searchTerm, deleteAsync]
	)
}
