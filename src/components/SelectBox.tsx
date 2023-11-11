import Select from 'react-select'
import { SelectOptionType } from '../types'

interface ISelectBox {
  handler: (val: string) => void
  options: SelectOptionType[]
  val?: string
}

const SelectBox: React.FC<ISelectBox> = ({ handler, options, val }) => {
  const defaultValue = options.find(el => el.label === val)
  
  return (
    <>
      <Select
        options={options}
        onChange={(e: any) => handler(e.value)}
        placeholder="Status"
        defaultValue={defaultValue ? defaultValue : options[0]}
        isSearchable={false}
        isOptionDisabled={option => option.value === val}
        styles={{
          control: (base, props) => ({
            ...base,
            background: '0',
            borderRadius: '4px',
            border: `1px solid ${props.menuIsOpen ? 'var(--color-purple)' : 'rgba(130, 143, 163, 0.25)'} !important`,
            boxShadow: 'none',
            cursor: 'pointer',
            fontSize: 'var(--fs)',
            fontWeight: '500',
            fontFamily: 'var(--ff)',
            height: 'var(--form-height)',
            outline: 'none',
            padding: '0',
          }),
          indicatorSeparator: () => ({}),
          singleValue: (base) => ({
            ...base, color: `var(--color-title)`
          }),
          menu: (base) => ({
            ...base,
            background: 'var(--color-main)',
            borderRadius: '8px',
            boxShadow: '0px 10px 20px 0px rgba(54, 78, 126, 0.25);',
            padding: '8px 0',
          }),
          option: (base, props) => ({
            ...base,
            background: `${props.isSelected ? 'var(--color-purple)' : '0'}`,
            cursor: 'pointer',
            fontWeight: '500',
          })
        }}
      />
    </>
  )
}

export default SelectBox
