import { FC } from 'react'

const SubHeading: FC<{ title: string }> = ({ title }) => {
	return <div className="text-white text-xl mb-5 font-semibold">{title}</div>
}

export default SubHeading
