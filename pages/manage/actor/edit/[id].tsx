import ActorEdit from '@/components/screens/admin/actor/ActorEdit'
import { NextPageAuth } from '@/shared/types/auth.types'
import { NextPage } from 'next'

const ActorEditPage: NextPageAuth = () => {
	return <ActorEdit />
}
ActorEditPage.isOnlyAdmin = true
export default ActorEditPage
