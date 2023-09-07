import ActorsList from '@/components/screens/admin/actors/ActorsList'
import { NextPageAuth } from '@/shared/types/auth.types'
import { NextPage } from 'next'

const ActorsListPage: NextPageAuth = () => {
	return <ActorsList />
}
ActorsListPage.isOnlyAdmin = true
export default ActorsListPage
