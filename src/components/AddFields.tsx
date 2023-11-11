import { useEffect, useState } from "react"
import styled from "styled-components"
import Btn from "./Btn"
import close from "../assets/icon-cross.svg"
import FormControl from "./FormInput"
import { FormLabel } from "./FormLine"
import { AddFieldType } from "../types"

interface IAddFields {
  btn: string
  label?: string
  setFields: React.Dispatch<React.SetStateAction<any>>
  list: AddFieldType[]
}

// Styles
const Wrap = styled.div`
  margin: 0 0 var(--gap);
`
const Item = styled.div`
  align-items: center;
  display: flex;
  margin: 0 0 10px;
`
const Delete = styled.button`
  background: url(${close}) center no-repeat;
  border: 0;
  border-radius: 0;
  cursor: pointer;
  height: var(--form-height);
  margin: 0 0 0 10px;
  outline: none;
  padding: 0;
  width: var(--close);
  -webkit-appearance: none;
`

const AddFields: React.FC<IAddFields> = ({ btn, label, setFields, list }) => {
  const [values, setValues] = useState<AddFieldType[]>(list)

  // https://www.react-hook-form.com/api/usefieldarray/

  useEffect(() => {
    setFields(values)
  }, [values])

  // addField
  const addField = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setValues(prev => [...prev, { id: Date.now(), title: '' }])
  }

  // handler
  const handler = (val: string, index: number) => {
    let onChangeValue = [...values]
    onChangeValue[index].title = val
    setValues(onChangeValue)
  }

  // removeField
  const removeField = (id: number) => {
    const newArray = values.filter(el => el.id !== id)
    setValues(newArray)
  }

  return (
    <Wrap>
      <FormLabel>{label}</FormLabel>
      {values.map((el, index) => (
        <Item key={el.id}>
          <FormControl handler={(val) => handler(val, index)} value={el.title} />
          <Delete type="button" onClick={() => removeField(el.id)} />
        </Item>
      ))}
      <Btn color="secondary" expand title={btn} handler={(e) => addField(e)} />
    </Wrap>
  )
}

export default AddFields
