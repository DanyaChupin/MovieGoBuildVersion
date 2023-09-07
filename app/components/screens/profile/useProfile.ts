import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { IProfileInput } from './profile.interface'
import { useMutation, useQuery } from '@tanstack/react-query'
import { UserService } from '@/services/user.service'
import { toastError } from '@/utils/toastError'
import { toastr } from 'react-redux-toastr'
import { useAuth } from '@/hooks/useAuth'

export const useProfile = (setValue: UseFormSetValue<IProfileInput>) => {
	const { user } = useAuth()
	const { isLoading } = useQuery(
		['profile'],
		() => UserService.getProfile(),

		{
			onSuccess({ data }) {
				setValue('email', data.email)
			},
			onError(error) {
				toastError(error, 'Get profile')
			},
			enabled: !!user,
		}
	)

	const { mutateAsync } = useMutation(
		['update profile'],
		(data: IProfileInput) => UserService.updateProfile(data),
		{
			onSuccess() {
				toastr.success('Update profile', 'update was successful')
			},
			onError(error) {
				toastError(error, 'Update profile')
			},
		}
	)

	const onSubmit: SubmitHandler<IProfileInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
