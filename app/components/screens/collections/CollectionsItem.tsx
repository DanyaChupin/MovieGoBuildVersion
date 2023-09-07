import { FC } from 'react'
import { ICollections } from './collections.interface'
import Link from 'next/link'
import cn from 'classnames'
import { getGenreUrl } from '@/config/url.config'
import CollectionsImage from './CollectionsImage'
import styles from './Collections.module.scss'

const CollectionsItem: FC<{ collection: ICollections }> = ({ collection }) => {
	return (
		<Link
			href={getGenreUrl(collection.slug)}
			className={styles.collection}
		>
			<CollectionsImage collection={collection} />
			<div className={styles.content}>
				<div className={styles.title}>{collection.title}</div>
			</div>
			<div className={cn(styles.behind, styles.second)}>
				<CollectionsImage collection={collection} />
			</div>
			<div className={cn(styles.behind, styles.third)}>
				<CollectionsImage collection={collection} />
			</div>
		</Link>
	)
}

export default CollectionsItem
