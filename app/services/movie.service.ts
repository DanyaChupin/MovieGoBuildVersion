import { axiosClassic } from 'api/interceptors'
import { getMoviesUrl } from '@/config/api.config'
import { IMovie } from '@/shared/types/movie.types'
import axios from 'api/interceptors'
import { IMovieEditInput } from '@/components/screens/admin/movie/movieEdit.interface'

export const MovieService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		})
	},

	async getMostPupularMovies() {
		const { data: movies } = await axiosClassic.get<IMovie[]>(
			getMoviesUrl('/most-popular')
		)
		return movies
	},

	async getByGenres(genreIds: string[]) {
		return axiosClassic.post<IMovie[]>(getMoviesUrl('/by-genres'), {
			genreIds,
		})
	},

	async getByActor(actorId: string) {
		return axiosClassic.get<IMovie[]>(
			getMoviesUrl(`/by-actor/${actorId}`)
		)
	},

	async getBySlug(slug: string) {
		return axiosClassic.get<IMovie>(getMoviesUrl(`/by-slug/${slug}`))
	},

	async getById(_id: string) {
		return axios.get<IMovieEditInput>(getMoviesUrl(`/${_id}`))
	},

	async update(_id: string, data: IMovieEditInput) {
		return axios.put<string>(getMoviesUrl(`/${_id}`), data)
	},

	async updateCountOpened(slug: string) {
		return axiosClassic.post(getMoviesUrl('/update-count-opened'), {
			slug,
		})
	},

	async create() {
		return axios.post<string>(getMoviesUrl(`/`))
	},

	async delete(_id: string) {
		return axios.delete<string>(getMoviesUrl(`/${_id}`))
	},
}
