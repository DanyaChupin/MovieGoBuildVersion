import Layout from '@/components/layout/Layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC } from 'react'
import ReduxToast from './ReduxToast'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import HeadProvider from './HeadProvider/HeadProvider'
import AuthProvider from './AuthProvider/AuthProvider'
import { TypeComponentAuthFields } from '@/shared/types/auth.types'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

const MainProvider: FC<TypeComponentAuthFields> = ({ children, Component }) => {
	return (
		<HeadProvider>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<ReduxToast />
					<AuthProvider Component={Component}>
						<Layout>{children}</Layout>
					</AuthProvider>
				</QueryClientProvider>
			</Provider>
		</HeadProvider>
	)
}
export default MainProvider
