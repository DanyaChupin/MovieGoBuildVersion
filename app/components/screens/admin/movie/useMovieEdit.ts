import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toastError } from '@/utils/toastError'
import { getKeys } from '@/utils/object/getKeys'
import { toastr } from 'react-redux-toastr'
import { getAdminUrl } from '@/config/url.config'
import { IMovieEditInput } from './movieEdit.interface'
import { MovieService } from '@/services/movie.service'

export const useMovieEdit = (setValue: UseFormSetValue<IMovieEditInput>) => {
	const { query, push } = useRouter()

	const movieId = String(query.id)
	const { isLoading } = useQuery(
		['movie', movieId],
		() => MovieService.getById(movieId),
		{
			onSuccess({ data }) {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
			},
			onError(error) {
				toastError(error, 'Get movie')
			},
			enabled: !!query.id,
		}
	)

	const { mutateAsync } = useMutation(
		['update movie'],
		(data: IMovieEditInput) => MovieService.update(movieId, data),
		{
			onSuccess() {
				toastr.success('Update movie', 'update was successful')
				push(getAdminUrl('movies'))
			},
			onError(error) {
				toastError(error, 'Update movie')
			},
		}
	)

	const onSubmit: SubmitHandler<IMovieEditInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
