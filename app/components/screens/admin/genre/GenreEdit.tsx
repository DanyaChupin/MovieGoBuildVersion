import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IGenreEditInput } from './genreEdit.interface'
import { useGenreEdit } from './useGenreEdit'
import Meta from '@/utils/meta/Meta'
import AdminNavigation from '@/components/ui/adminNavigaton/AdminNavigation'
import Heading from '@/components/ui/heading/Heading'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Field from '@/components/ui/formElements/Field'
import SlugField from '@/components/ui/formElements/slugField/SlugField'
import generateSlug from '@/utils/string/generateSlug'
import Button from '@/components/ui/formElements/Button'
import styles from '../../../ui/formElements/AdminForm.module.scss'

import { stripHtml } from 'string-strip-html'
import dynamic from 'next/dynamic'

const DynamicTextEditor = dynamic(
	() => import('@/components/ui/formElements/TextEditor'),
	{
		ssr: false,
	}
)
const GenreEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
		setValue,
		getValues,
	} = useForm<IGenreEditInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useGenreEdit(setValue)

	return (
		<Meta title="Edit genre">
			<AdminNavigation />
			<Heading title="Edit genre" />
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
								style={{ width: '31%' }}
							/>

							<div style={{ width: '31%' }}>
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
							</div>

							<Field
								{...register('icon', {
									required: 'Icon is required!',
								})}
								placeholder="Icon"
								error={errors.icon}
								style={{ width: '31%' }}
							/>
						</div>
						<Controller
							name="description"
							control={control}
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<DynamicTextEditor
									placeholder="Description"
									onChange={onChange}
									error={error}
									value={value}
								/>
							)}
							rules={{
								validate: {
									required: (v) =>
										(v &&
											stripHtml(v).result
												.length > 0) ||
										'Description is required!',
								},
							}}
						/>
						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default GenreEdit
