import Heading from '@/components/ui/heading/Heading'
import Meta from '@/utils/meta/Meta'
import Link from 'next/link'

export default function Error404() {
	return (
		<Meta title="Page not found">
			<Heading title="404 - Page not found" />
			<Link href="/">Go home</Link>
		</Meta>
	)
}
