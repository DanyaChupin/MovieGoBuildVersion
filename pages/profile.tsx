import Profile from '@/components/screens/profile/Profile'
import { useAuth } from '@/hooks/useAuth'
import { NextPageAuth } from '@/shared/types/auth.types'
import Meta from '@/utils/meta/Meta'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const ProfilePage: NextPageAuth = () => {
	const { user } = useAuth()
	const { push } = useRouter()
	useEffect(() => {
		if (!user) push('/')
	}, [user])

	return (
		<Meta title="Profile">
			<Profile />
		</Meta>
	)
}
export default ProfilePage
