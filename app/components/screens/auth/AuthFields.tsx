import Field from '@/components/ui/formElements/Field'
import { validEmail } from '@/shared/regex'
import { FC } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'

interface IAuthFields {
	register: UseFormRegister<any>
	formState: FormState<any>
	isPasswordRequired?: boolean
}

const AuthFields: FC<IAuthFields> = ({
	register,
	formState: { errors },
	isPasswordRequired = false,
}) => {
	return (
		<>
			<Field
				{...register('email', {
					required: 'Email is required',
					pattern: {
						value: validEmail,
						message: 'Email is not valid',
					},
				})}
				placeholder="E-mail"
				error={errors.email}
			/>
			<Field
				{...register(
					'password',
					isPasswordRequired
						? {
								required: 'Password is required',
								minLength: {
									value: 6,
									message: 'Password must be at least 6 characters',
								},
						  }
						: {}
				)}
				type="password"
				placeholder="Password"
				error={errors.password}
			/>
		</>
	)
}
export default AuthFields
