import { FC, FormEventHandler, ReactNode } from 'react';
import './form.css';

interface FormProps {
  error: string | null;
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const Form: FC<FormProps> = ({ children, onSubmit, error }) => {
  return (
    <form onSubmit={onSubmit}>
      {children}
      {error && <p className='form-error'>{error}</p>}
    </form>
  );
};

export default Form;
