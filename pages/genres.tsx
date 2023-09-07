import Collections from '@/components/screens/collections/Collections'
import { ICollections } from '@/components/screens/collections/collections.interface'
import { GenreService } from '@/services/genre.service'
import { GetStaticProps, NextPage } from 'next'
import Error404 from './404'

const DiscoveryPage: NextPage<{ collections: ICollections[] }> = ({
	collections,
}) => {
	return collections ? (
		<Collections collections={collections || []} />
	) : (
		<Error404 />
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: collections } = await GenreService.getCollections()
		return { props: { collections } }
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default DiscoveryPage
