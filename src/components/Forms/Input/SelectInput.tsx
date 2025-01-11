import { ChangeEventHandler, FC } from 'react';
import './input.css';

type SelectInputProps = {
  label: string;
  value: string;
}

interface InputProps {
  label: string;
  name: string;
  value: string;
  options: SelectInputProps[];
  disabled?: boolean;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

const SelectInput: FC<InputProps> = ({ label, value, onChange, disabled, options }) => {
  return (
    <div className="inputs">
        <label htmlFor={label}>{label}</label>
        <select onChange={onChange} disabled={disabled}>
          {
            options.map(option => (
              option.value === value ? <option value={option.value} selected>{option.label}</option> : <option value={option.value}>{option.label}</option>
            ))
          }
        </select>
      </div>
  );
};

export default SelectInput;
