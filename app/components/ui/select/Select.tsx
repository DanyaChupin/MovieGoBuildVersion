import { FC } from 'react'
import makeAnimated from 'react-select/animated'
import { IOption, ISelect } from './select.interface'
import ReactSelect, { OnChangeValue } from 'react-select'
import styles from './select.module.scss'
import stylesForm from '../formElements/form.module.scss'

const animatedComponents = makeAnimated()
const Select: FC<ISelect> = ({
	field,
	isLoading,
	options,
	placeholder,
	error,
	isMulti,
}) => {
	const onChange = (newValue: unknown | OnChangeValue<IOption, boolean>) => {
		field.onChange(
			isMulti
				? (newValue as IOption[]).map((item) => item.value)
				: (newValue as IOption).value
		)
	}
	const getValue = () => {
		if (field.value) {
			return isMulti
				? options.filter((options) => field.value.indexOf(options.value) >= 0)
				: options.find((option) => option.value === field.value)
		} else {
			return isMulti ? [] : ''
		}
	}
	return (
		<div className={styles.selectContainer}>
			<div>
				<span>{placeholder}</span>
				<ReactSelect
					classNamePrefix="custom-select"
					options={options}
					value={getValue()}
					isMulti={isMulti}
					onChange={onChange}
					components={animatedComponents}
					isLoading={isLoading}
				/>
			</div>
			{error && <div className={stylesForm.error}>{error.message}</div>}
		</div>
	)
}

export default Select
