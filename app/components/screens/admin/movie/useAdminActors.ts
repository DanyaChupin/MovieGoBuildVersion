import { IOption } from '@/components/ui/select/select.interface'
import { ActorService } from '@/services/actor.service'
import { toastError } from '@/utils/toastError'
import { useQuery } from '@tanstack/react-query'

export const useAdminActors = () => {
	const queryData = useQuery(
		['List of actor'],
		() => ActorService.getAll(),
		{
			select: ({ data }) =>
				data.map(
					(actor): IOption => ({
						label: actor.name,
						value: actor._id,
					})
				),
			onError: (error) => {
				toastError(error, 'Actor list')
			},
		}
	)
	return queryData
}
