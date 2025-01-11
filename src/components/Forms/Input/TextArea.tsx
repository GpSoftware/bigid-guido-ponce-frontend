import { ChangeEventHandler, FC } from 'react';
import './input.css';

interface InputProps {
  label: string;
  name: string;
  value: string;
  required?: boolean;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

const TextArea: FC<InputProps> = ({ required, name, label, value, onChange }) => {
  return (
    <div className="inputs">
        <label htmlFor={label}>{label}</label>
        <textarea
          name={name}
          id={label}
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
  );
};

export default TextArea;
