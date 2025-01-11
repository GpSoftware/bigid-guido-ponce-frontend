import '../styles.css';

import Table from '../../../components/Table/Table';
import { useUsers } from '../../../hooks/users/useUsers';
import { useAuth } from '../../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useDeleteUser } from '../../../hooks/users';

const Users = () => {
  const { mutateAsync: deleteRecord } = useDeleteUser();
  const { accountName } = useAuth();
  const { data: users } = useUsers();
  const navigate = useNavigate();

  const deleteUser = async (id: number) => {
    const result = confirm('Are you sure you want to delete this user? All comments and articles are going to be deleted.');

    if (result) {
      try {
        await deleteRecord(id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        alert('Cannot delete organization');
      }
    }
  }

  return (
    <>
    <div className='page-header'>
      <h1>Users</h1>
    </div>
    <p style={{ fontSize: '14px' }}>Deleting users will delete their articles and comments</p>
    <Table headers={['ID', 'Username', 'Email', 'Organization Name', 'Amount of Articles', 'Amount of Comments', 'Actions']}>
      <tbody>
      {
        users?.map((user, idx) => (
          <tr key={idx}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.organization_name}</td>
            <td>{user.amount_of_articles}</td>
            <td>{user.amount_of_comments}</td>
            <td>
              {accountName !== user.username && <button style={{ padding: '10px', margin: '5px', backgroundColor: 'red' }} onClick={() => deleteUser(user.id)}>Delete</button>}
              <button onClick={() => navigate(`/users/${user.id}`)} style={{ padding: '10px', margin: '5px' }}>Update</button>
            </td>
          </tr>
        ))
      }
      </tbody>
    </Table>
    </>
  );
}

export default Users;
