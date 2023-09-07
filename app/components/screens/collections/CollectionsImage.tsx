import { FC } from 'react'
import { ICollections } from './collections.interface'
import Image from 'next/image'

const CollectionsImage: FC<{ collection: ICollections }> = ({
	collection: { image, title },
}) => {
	return <Image alt={title} src={image} layout="fill" draggable={false} />
}

export default CollectionsImage
