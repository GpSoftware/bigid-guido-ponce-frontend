import { ChangeEventHandler, FC } from 'react';
import './input.css';

interface InputProps {
  label: string;
  name: string;
  value: string;
  disabled?: boolean;
  required?: boolean;
  type: 'text' | 'password';
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Input: FC<InputProps> = ({ required, name, label, value, onChange, type, disabled }) => {
  return (
    <div className="inputs">
        <label htmlFor={label}>{label}</label>
        <input
          name={name}
          disabled={disabled}
          type={type}
          id={label}
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
  );
};

export default Input;
