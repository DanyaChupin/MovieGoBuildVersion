import { axiosClassic } from 'api/interceptors'
import { IActor, IMovie } from '@/shared/types/movie.types'
import axios from 'api/interceptors'
import { getActorsUrl, getMoviesUrl } from '@/config/api.config'
import { IActorEditInput } from '@/components/screens/admin/actor/actorEdit.interface'

export const ActorService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IActor[]>(getActorsUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		})
	},
	async getMostPupular() {
		const { data: actors } = await axiosClassic.get<IActor[]>(
			getActorsUrl('/most-popular')
		)
		return actors
	},
	async getBySlug(slug: string) {
		return axiosClassic.get<IActor>(getActorsUrl(`/by-slug/${slug}`))
	},
	async getByGenres(actorId: string) {
		return axiosClassic.post<IMovie[]>(
			getMoviesUrl(`/by-actor/${actorId}`)
		)
	},
	async getById(_id: string) {
		return axios.get<IActorEditInput>(getActorsUrl(`/${_id}`))
	},
	async update(_id: string, data: IActorEditInput) {
		return axios.put<string>(getActorsUrl(`/${_id}`), data)
	},
	async create() {
		return axios.post<string>(getActorsUrl('/'))
	},
	async delete(_id: string) {
		return axios.delete<string>(getActorsUrl(`/${_id}`))
	},
}
