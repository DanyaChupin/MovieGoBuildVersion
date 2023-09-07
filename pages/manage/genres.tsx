import GenresList from '@/components/screens/admin/genres/GenresList'
import { NextPageAuth } from '@/shared/types/auth.types'
import { NextPage } from 'next'

const GenresListPage: NextPageAuth = () => {
	return <GenresList />
}
GenresListPage.isOnlyAdmin = true
export default GenresListPage
