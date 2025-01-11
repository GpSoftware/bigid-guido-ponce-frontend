import '../styles.css';
import Table from '../../../components/Table/Table';
import { useOrganizations } from '../../../hooks/organizations/useOrganizations';
import { useNavigate } from 'react-router-dom';
import { useDeleteOrganization } from '../../../hooks/organizations';

const Organizations = () => {
  const navigate = useNavigate();
  const { data: organizations } = useOrganizations();
  const { mutateAsync: deleteRecord } = useDeleteOrganization();

  const deleteOrganization = async (id: number) => {
    const result = confirm('Are you sure you want to delete this organization?');

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
      <h1>Organizations</h1>
      <button onClick={() => navigate('/organizations/create')}>Create Organization</button>
    </div>
    <p style={{ fontSize: '14px' }}>Organization can be deleted only if they don't have users attached</p>
    <Table headers={['ID', 'Name', 'Amount of Users', 'Actions']}>
      <tbody>
      {
        organizations?.map((organization, idx) => (
          <tr key={idx}>
            <td>{organization.id}</td>
            <td>{organization.name}</td>
            <td>{organization.amount_of_users}</td>
            <td>
              {organization.amount_of_users <= 0 && <button style={{ padding: '10px', margin: '5px', backgroundColor: 'red' }} onClick={() => deleteOrganization(organization.id)}>Delete</button>}
              <button onClick={() => navigate(`/organizations/${organization.id}`)} style={{ padding: '10px', margin: '5px' }}>Update</button>
              <button onClick={() => navigate(`/organizations/${organization.id}/user/create`)} style={{ padding: '10px', margin: '5px' }}>Add User</button>
            </td>
          </tr>
        ))
      }
      </tbody>
    </Table>
    </>
  );
}

export default Organizations;
