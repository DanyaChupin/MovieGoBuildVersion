import { FC } from 'react'
import Search from './search/Search'
import styles from './Sidebar.module.scss'
import MoviesContainer from './moviesContainer/MoviesContainer'

const Sidebar: FC = () => {
	return (
		<div className={styles.sidebar}>
			<Search />
			<MoviesContainer />
		</div>
	)
}

export default Sidebar
