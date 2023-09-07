import { getAdminUrl } from '@/config/url.config'
import { useDebounce } from '@/hooks/useDebounce'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastError } from '@/utils/toastError'
import { GenreService } from '@/services/genre.service'
import { toastr } from 'react-redux-toastr'
import { ITableItem } from '@/components/ui/adminTable/AdminTable.interface'
import { useRouter } from 'next/router'

export const useGenres = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const {
		data: genres,
		refetch,
		isLoading,
	} = useQuery(
		['genre list', debouncedSearch],
		() => GenreService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(genre): ITableItem => ({
						_id: genre._id,
						editUrl: getAdminUrl(`genre/edit/${genre._id}`),
						items: [genre.name, genre.slug],
					})
				),
			onError(error) {
				toastError(error, 'genre list')
			},
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}
	const { push } = useRouter()
	const { mutateAsync: createAsync } = useMutation(
		['create genre'],
		() => GenreService.create(),
		{
			onError(error) {
				toastError(error, 'Create genre')
			},
			onSuccess({ data: _id }) {
				toastr.success('Create genre', 'create was successful')
				push(getAdminUrl(`genre/edit/${_id}`))
			},
		}
	)
	const { mutateAsync: deleteAsync } = useMutation(
		['delete genre'],
		(genreId: string) => GenreService.delete(genreId),
		{
			onError(error) {
				toastError(error, 'Delete genre')
			},
			onSuccess() {
				toastr.success('Delete genre', 'delete was successful')
				refetch()
			},
		}
	)

	return useMemo(
		() => ({
			handleSearch,
			genres,
			searchTerm,
			createAsync,
			deleteAsync,
			isLoading,
			refetch,
		}),
		[genres, createAsync, searchTerm, deleteAsync]
	)
}
