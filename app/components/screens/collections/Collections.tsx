import { FC } from 'react'
import styles from './Collections.module.scss'
import { ICollections } from './collections.interface'
import Meta from '@/utils/meta/Meta'
import Heading from '@/components/ui/heading/Heading'
import Description from '@/components/ui/heading/Description'
import CollectionsItem from './CollectionsItem'

const title = 'Discovery'
const description = 'In this section you will find all genres on our site'

const Collections: FC<{ collections: ICollections[] }> = ({ collections }) => {
	return (
		<Meta title={title} description={description}>
			<Heading title={title} className={styles.heading} />
			<Description text={description} className={styles.description} />
			<section className={styles.collections}>
				{collections?.map((item) => (
					<CollectionsItem key={item._id} collection={item} />
				))}
			</section>
		</Meta>
	)
}

export default Collections
