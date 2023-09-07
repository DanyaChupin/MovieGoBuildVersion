import { FC } from 'react'
import styles from './Profile.module.scss'
import { useForm } from 'react-hook-form'
import { IProfileInput } from './profile.interface'
import { useProfile } from './useProfile'
import Meta from '@/utils/meta/Meta'
import Heading from '@/components/ui/heading/Heading'
import Button from '@/components/ui/formElements/Button'
import AuthFields from '../auth/AuthFields'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

const Profile: FC = () => {
	const { handleSubmit, setValue, register, formState } =
		useForm<IProfileInput>({
			mode: 'onChange',
		})
	const { isLoading, onSubmit } = useProfile(setValue)
	return (
		<Meta title="Profile">
			<Heading title="Profile" className="mb-6" />
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				{isLoading ? (
					<SkeletonLoader count={2} />
				) : (
					<AuthFields
						formState={formState}
						register={register}
					/>
				)}
				<Button>Update</Button>
			</form>
		</Meta>
	)
}

export default Profile
