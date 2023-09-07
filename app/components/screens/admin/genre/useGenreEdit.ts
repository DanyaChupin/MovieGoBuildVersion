import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { IGenreEditInput } from './genreEdit.interface'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { GenreService } from '@/services/genre.service'
import { toastError } from '@/utils/toastError'
import { getKeys } from '@/utils/object/getKeys'
import { toastr } from 'react-redux-toastr'
import { getAdminUrl } from '@/config/url.config'
import { useGenres } from '../genres/useGenres'
import { usePopularGenres } from '@/components/layout/navigation/menuContainer/genres/usePopularGenres'

export const useGenreEdit = (setValue: UseFormSetValue<IGenreEditInput>) => {
	const { push, query } = useRouter()
	const queryData = usePopularGenres()
	const genreId = String(query.id)
	const { isLoading } = useQuery(
		['genre', genreId],
		() => GenreService.getById(genreId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
			},
			onError: (err) => {
				toastError(err, 'Get genre')
			},
			enabled: !!query.id,
		}
	)
	const { mutateAsync } = useMutation(
		['update genre'],
		(data: IGenreEditInput) => GenreService.update(genreId, data),
		{
			onSuccess: () => {
				toastr.success('Update genre', 'update was successful')
				queryData.refetch()
				push(getAdminUrl('genres'))
			},
			onError: (err) => {
				toastError(err, 'Update genre')
			},
		}
	)
	const onSubmit: SubmitHandler<IGenreEditInput> = async (data) => {
		await mutateAsync(data)
	}
	return { onSubmit, isLoading }
}
