import { IGallaryItem } from '@/components/ui/gallery/gallery.interface'
import { ISlide } from '@/components/ui/slider/slider.interface'

export interface IHome {
	slides: ISlide[]
	trendingMovie: IGallaryItem[]
	actors: IGallaryItem[]
}
