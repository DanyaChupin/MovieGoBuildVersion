export interface IGallaryItem {
	posterPath: string
	name: string
	link: string
	content?: {
		title: string
		subTitle?: string
	}
}

export interface IGalleryItemProps {
	item: IGallaryItem
	variant: 'vertical' | 'horizontal'
}
