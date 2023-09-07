import { ControllerRenderProps } from 'react-hook-form'
import { IFieldProps } from '../formElements/form.interface'
import { Options } from 'react-select'
export interface IOption {
	value: string
	label: string
}
export interface ISelect extends IFieldProps {
	options: Options<IOption>
	isMulti?: boolean
	field: ControllerRenderProps<any, any>
	isLoading: boolean
}
