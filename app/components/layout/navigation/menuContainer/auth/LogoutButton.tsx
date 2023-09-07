import MaterialIcon from '@/components/ui/MaterialIcon'
import { useActions } from '@/hooks/useActions'
import { useRouter } from 'next/router'
import { FC, MouseEvent } from 'react'

const LogoutButton: FC = () => {
	const { logout } = useActions()
	const { push } = useRouter()
	const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()

		logout()

		push('/')
	}
	return (
		<li>
			<a onClick={handleLogout}>
				<MaterialIcon name="MdLogout" />
				<span>Logout</span>
			</a>
		</li>
	)
}

export default LogoutButton
