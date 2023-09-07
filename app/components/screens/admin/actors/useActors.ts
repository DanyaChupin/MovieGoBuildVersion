import { getAdminUrl } from '@/config/url.config'
import { useDebounce } from '@/hooks/useDebounce'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastError } from '@/utils/toastError'
import { ActorService } from '@/services/actor.service'
import { toastr } from 'react-redux-toastr'
import { ITableItem } from '@/components/ui/adminTable/AdminTable.interface'
import { error } from 'console'
import { useRouter } from 'next/router'

export const useActors = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['actor list', debouncedSearch],
		() => ActorService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(actor): ITableItem => ({
						_id: actor._id,
						editUrl: getAdminUrl(`actor/edit/${actor._id}`),
						items: [actor.name, String(actor.countMovies)],
					})
				),
			onError(error) {
				toastError(error, 'actor list')
			},
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}
	const { push } = useRouter()
	const { mutateAsync: createAsync } = useMutation(
		['create actor'],
		() => ActorService.create(),
		{
			onSuccess({ data: _id }) {
				toastr.success('Create actir', 'create was successful')
				push(getAdminUrl(`actor/edit/${_id}`))
			},
			onError(error) {
				toastError(error, 'Create actors')
			},
		}
	)
	const { mutateAsync: deleteAsync } = useMutation(
		['delete actor'],
		(userId: string) => ActorService.delete(userId),
		{
			onError(error) {
				toastError(error, 'Delete actor')
			},
			onSuccess() {
				toastr.success('Delete actor', 'delete was successful')
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
