import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import logoImage from '@/assets/images/logo.svg'
const Logo: FC = () => {
	return (
		<Link href="/" className="flex items-center pl-layout mb-3">
			<Image
				className="w-5 h-5 mr-2"
				src={logoImage}
				alt="MovieGo"
				draggable={false}
			/>
			<h1 className="text-xl text-white">MovieGo</h1>
		</Link>
	)
}

export default Logo
