import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Meta from '@/utils/meta/Meta'
import AdminNavigation from '@/components/ui/adminNavigaton/AdminNavigation'
import Heading from '@/components/ui/heading/Heading'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Field from '@/components/ui/formElements/Field'
import SlugField from '@/components/ui/formElements/slugField/SlugField'
import generateSlug from '@/utils/string/generateSlug'
import Button from '@/components/ui/formElements/Button'
import styles from '../../../ui/formElements/AdminForm.module.scss'

import { useActorEdit } from './useActorEdit'
import { IActorEditInput } from './actorEdit.interface'
import UploadField from '@/components/ui/formElements/uploadField/UploadField'

const ActorEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
		setValue,
		getValues,
	} = useForm<IActorEditInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useActorEdit(setValue)

	return (
		<Meta title="Edit actor">
			<AdminNavigation />
			<Heading title="Edit actor" />
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={styles.fields}>
							<Field
								{...register('name', {
									required: 'Name is required!',
								})}
								placeholder="Name"
								error={errors.name}
							/>

							<SlugField
								generate={() =>
									setValue(
										'slug',
										generateSlug(
											getValues('name')
										)
									)
								}
								register={register}
								error={errors.slug}
							/>

							<Controller
								name="photo"
								control={control}
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										value={value}
										folder="actors"
										placeholder="Photo"
										error={error}
									/>
								)}
								rules={{
									required: 'Photo is required!',
								}}
							/>
						</div>
						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default ActorEdit
