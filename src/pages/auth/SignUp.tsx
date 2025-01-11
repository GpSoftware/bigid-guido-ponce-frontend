import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import Form from '../../components/Forms/Form';
import Input from '../../components/Forms/Input/Input';

const SignUp: React.FC = () => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, username, password);
      setError(null);
    } catch (error) {
      setError('Sign up failed. Please try again.');
      console.error('Error during sign up:', error);
    }
  };

  return (
    <div className='form-container'>
      <h1>Big ID Sign Up</h1>
      <Form onSubmit={handleSubmit} error={error}>
        <Input
          name='username'
          required
          label='username'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          required
          name='email'
          label='email'
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          name='password'
          label='password'
          required
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">Sign Up</button>

        <a href='/'>Do you already have an account? Click here</a>
      </Form>
    </div>
  );
};

export default SignUp;
