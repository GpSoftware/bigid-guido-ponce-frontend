import './styles.css';
import { useAuth } from '../../providers/AuthProvider';

const Home = () => {
  const { accountName } = useAuth();

  return (
    <>
    <div className='page-header'>
      <h1>Welcome {accountName}</h1>
    </div>
    </>
  );
}

export default Home;
