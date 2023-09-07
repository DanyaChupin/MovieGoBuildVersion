import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IUserEditInput } from './userEdit.interface'
import { useUserEdit } from './useUserEdit'
import Meta from '@/utils/meta/Meta'
import AdminNavigation from '@/components/ui/adminNavigaton/AdminNavigation'
import Heading from '@/components/ui/heading/Heading'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Button from '@/components/ui/formElements/Button'
import styles from '../../../ui/formElements/AdminForm.module.scss'

import AuthFields from '../../auth/AuthFields'

const UserEdit: FC = () => {
	const { handleSubmit, register, formState, control, setValue } =
		useForm<IUserEditInput>({
			mode: 'onChange',
		})

	const { isLoading, onSubmit } = useUserEdit(setValue)

	return (
		<Meta title="Edit user">
			<AdminNavigation />
			<Heading title="Edit user" />
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<AuthFields
							register={register}
							formState={formState}
						/>
						<Controller
							control={control}
							name="isAdmin"
							render={({ field }) => (
								<button
									className="text-link block mb-5"
									onClick={(e) => {
										e.preventDefault()
										field.onChange(!field.value)
									}}
								>
									{field.value
										? 'Make it regular user'
										: 'Make it admin'}
								</button>
							)}
						></Controller>
						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default UserEdit
