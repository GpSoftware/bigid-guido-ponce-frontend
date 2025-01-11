import './styles.css';
import { FC, useState } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import Form from '../../components/Forms/Form';
import Input from '../../components/Forms/Input/Input';

const SignIn: FC = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      setError(null);
    } catch (error) {
      setError('Invalid email or password');
      console.error('Error during sign in:', error);
    }
  };

  return (
    <div className='form-container'>
      <h1>Big ID Sign In</h1>
      <Form onSubmit={handleSubmit} error={error}>
        <Input
          name='email'
          label='email'
          type='text'
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          name='password'
          label='password'
          type='password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">Sign In</button>

        <a href='/signUp'>Create an account</a>
      </Form>
    </div>
  );
};

export default SignIn;
