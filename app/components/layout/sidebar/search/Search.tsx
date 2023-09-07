import { FC } from 'react'
import { useSearch } from './useSearch'
import styles from './Search.module.scss'
import SearhcList from './searchList/SearhcList'
import SearchField from '@/components/ui/search-field/SearchField'

const Search: FC = () => {
	const { isSuccess, data, handleSearch, searchTerm } = useSearch()
	return (
		<div className={styles.wrapper}>
			<SearchField
				searchTerm={searchTerm}
				handleSearch={handleSearch}
			/>
			{isSuccess && <SearhcList movies={data || []} />}
		</div>
	)
}

export default Search
