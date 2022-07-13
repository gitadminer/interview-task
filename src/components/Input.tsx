import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { reChangeProps } from '../interfaces/task' 


interface OptionsProps {
  type: string;
  name: string;
  [key: string]: string;
}
interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  values?: any;
  options?: OptionsProps[];
  onchange?: (props: reChangeProps) => void
}

const InputComponent = styled.input`
  width: 180px;
  height: 28px;
  border: 1px solid #dcdcdc;
  margin-left: 8px;
`;
const SelectComponent = styled.select`
  width: 180px;
  height: 28px;
  border: 1px solid #dcdcdc;
  margin-left: 8px;
`;

export default function useInput(props: InputProps) {
  const { type, placeholder, label, values, options, onchange } = props;
  const [value, setValues] = useState(values[label] || "");
  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const evtValue = event.target.value
    setValues(evtValue);
    values[label] = evtValue;
    if(onchange) onchange({type: label, value: evtValue})
  };
  return (
    <>
      {type === "select" ? (
        <SelectComponent
          placeholder={placeholder || "请输入"}
          value={value}
          onChange={onChange}
        >
          {(options || []).map((val) => (
            <option key={val.type} value={val.type}>
              {val.name}
            </option>
          ))}
        </SelectComponent>
      ) : (
        <InputComponent
          placeholder={placeholder || "请输入"}
          value={value}
          onChange={onChange}
        ></InputComponent>
      )}
    </>
  );
}
