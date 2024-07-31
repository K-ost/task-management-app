import styled from "styled-components";
import Btn from "./Btn";
import close from "../assets/icon-cross.svg";
import FormControl, { InputWrap } from "./FormInput";
import { FormLabel } from "./FormLine";

interface IAddFields {
  btn: string;
  fields: any[];
  label?: string;
  append: any;
  remove: any;
  register: any;
  errors: any;
}

// Styles
const Wrap = styled.div`
  margin: 0 0 var(--gap);
`;
const Item = styled.div`
  align-items: center;
  display: flex;
  margin: 0 0 10px;
  ${InputWrap} {
    flex: 1;
  }
`;
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
`;

const AddFields: React.FC<IAddFields> = ({
  append,
  btn,
  errors,
  label,
  fields,
  register,
  remove,
}) => {
  return (
    <Wrap>
      <FormLabel>{label}</FormLabel>
      <div>
        {fields.map((item, index) => (
          <Item key={item.id} data-testid={`field-${item.id}`}>
            <FormControl
              valid={register(`columns.${index}.title`, {
                required: true,
                minLength: { value: 3, message: "Min" },
              })}
              error={!!errors.columns?.[index]}
            />
            <Delete type="button" onClick={() => remove(index)} />
          </Item>
        ))}
      </div>
      <Btn
        color="secondary"
        expand
        title={btn}
        handler={() => append({ title: "", id: Date.now() })}
      />
    </Wrap>
  );
};

export default AddFields;
