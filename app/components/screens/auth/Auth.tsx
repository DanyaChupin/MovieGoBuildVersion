import { FC, useState } from 'react'
import { useAuthRedirect } from './useAuthRedirect'
import { useAuth } from '@/hooks/useAuth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAuthInput } from './auth.interface'
import styles from './auth.module.scss'
import Meta from '@/utils/meta/Meta'
import Heading from '@/components/ui/heading/Heading'
import Button from '@/components/ui/formElements/Button'
import AuthFields from './AuthFields'
import { useActions } from '@/hooks/useActions'
import { useRouter } from 'next/router'

const Auth: FC = () => {
	useAuthRedirect()
	const { push } = useRouter()
	const { isLoading } = useAuth()
	const [type, setType] = useState<'login' | 'register'>('login')

	const {
		register: registerInput,
		handleSubmit,
		formState,
		reset,
	} = useForm<IAuthInput>({
		mode: 'onChange',
	})

	const { login, register } = useActions()

	const onSubmit: SubmitHandler<IAuthInput> = (data) => {
		if (type === 'login') login(data)
		else if (type === 'register') register(data)

		reset()
		push('/')
	}

	return (
		<Meta title="Auth">
			<section className={styles.wrapper}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Heading title="Auth" className="mb-6" />

					<AuthFields
						formState={formState}
						register={registerInput}
						isPasswordRequired
					/>
					<div className={styles.buttons}>
						<Button
							type="submit"
							onClick={() => setType('login')}
							disabled={isLoading}
						>
							Login
						</Button>
						<Button
							type="submit"
							onClick={() => setType('register')}
							disabled={isLoading}
						>
							register
						</Button>
					</div>
				</form>
			</section>
		</Meta>
	)
}

export default Auth
