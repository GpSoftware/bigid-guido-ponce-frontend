import { FC, useEffect, useState } from 'react';
import Form from '../../../components/Forms/Form';
import Input from '../../../components/Forms/Input/Input';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateOrganization, useCreateOrganization, useOrganization } from '../../../hooks/organizations';

interface FormProps {
  isEdit?: boolean;
}

const OrganizationForm: FC<FormProps> = ({ isEdit }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useOrganization(id ? Number(id) : undefined);
  const { mutateAsync: updateOrganization } = useUpdateOrganization();
  const { mutateAsync: createOrganization } = useCreateOrganization();
  const [name, setName] = useState(data?.name || '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data) setName(data.name);
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit && id) {
        if (name.length < 3) {
          throw new Error('Organization name should be greater than 3');
        }
        await updateOrganization({
          organizationId: Number(id),
          organizationName: name,
        });
      } else {
        if (name.length < 3) {
          throw new Error('Organization name should be greater than 3');
        }
        await createOrganization({
          name,
        });
      }
      
      setError(null);
      navigate('/organizations');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message || `Cannot ${isEdit ? 'Update' : 'Create'} organization`);
    }
  };

  return (
    <div className='form-container'>
      <h1>Organization {isEdit ? 'Edit' : 'Creation'}</h1>
      <Form onSubmit={handleSubmit} error={error}>
        <Input
          name='name'
          required
          label='Organization Name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit" className="submit-button">{isEdit ? 'Update' : 'Create'}</button>
      </Form>
    </div>
  );
};

export default OrganizationForm;