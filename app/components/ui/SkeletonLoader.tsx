import Skeleton, { SkeletonProps } from 'react-loading-skeleton'
import cn from 'classnames'
import { FC } from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import { useRenderClient } from '@/hooks/useRenderClient'
const SkeletonLoader: FC<SkeletonProps> = ({ className, ...rest }) => {
	const { isRenderClient } = useRenderClient()
	if (isRenderClient)
		return (
			<Skeleton
				{...rest}
				baseColor="#1F2125"
				highlightColor="#292A2E"
				className={cn('rounded-lg', className)}
			/>
		)
}

export default SkeletonLoader
