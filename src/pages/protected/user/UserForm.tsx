import { ChangeEvent, FC, useEffect, useState } from 'react';
import Form from '../../../components/Forms/Form';
import Input from '../../../components/Forms/Input/Input';
import { useNavigate, useParams } from 'react-router-dom';
import { Organization } from '../../../types/organizations';
import { useUser } from '../../../hooks/users/useUser';
import { CreateUser, UpdateUser } from '../../../types/users';
import { useOrganizations } from '../../../hooks/organizations';
import SelectInput from '../../../components/Forms/Input/SelectInput';
import { useCreateUser, useUpdateUser } from '../../../hooks/users';
import { validateRequest } from '../../../utils/validateRequest';

interface FormProps {
  isEdit?: boolean;
}

const UserForm: FC<FormProps> = ({ isEdit }) => {
  const navigate = useNavigate();
  const { id, organizationId } = useParams();
  const { data } = useUser(id ? Number(id) : undefined);
  const { data: organizations } = useOrganizations();
  const { mutateAsync: updateUser } = useUpdateUser();
  const { mutateAsync: createUser } = useCreateUser();
  const [user, setUser] = useState<CreateUser>({
    username: '',
    email: '',
    password: '',
    organization_id: 1,
  });
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (organizations && data) {
      const org = organizations.filter(_org => _org.id === data.organization_id)[0];
      setOrganization(org);
    }
    if (organizationId && organizations) {
      const org = organizations.filter(_org => _org.id === Number(organizationId))[0];
      setOrganization(org);
    }
  }, [organizations, data, organizationId]);

  useEffect(() => {
    if (data) setUser({
      username: data.username,
      email: data.email,
      password: '',
      organization_id: data.organization_id,
    });
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit && id) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (user.password.trim() === '') delete user.password;
        
        const result = validateRequest(user, UpdateUser);
        if (!result.success) {
          throw new Error(result.errors.toString());
        }

        await updateUser({
          userId: Number(id),
          user: {
            ...user,
            organization_id: organization?.id || Number(organizationId),
          }
        });
      } else {
        const result = validateRequest(user, CreateUser);
        if (!result.success) {
          throw new Error(result.errors.toString());
        }

        await createUser({
          ...user,
          organization_id: organization?.id || Number(organizationId),
        });
      }

      setError(null);
      navigate('/users');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message || `Cannot ${isEdit ? 'Update' : 'Create'} user`);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className='form-container'>
      <h1>Organization {isEdit ? 'Edit' : 'Creation'}</h1>
      <Form onSubmit={handleSubmit} error={error}>
        <Input
          name='username'
          label='Username'
          type='text'
          required
          value={user.username}
          onChange={onChange}
        />

        <Input
          name='email'
          disabled={isEdit ? true : false}
          label='email'
          type='text'
          required
          value={user.email}
          onChange={onChange}
        />

        <Input
          name='password'
          label='Password'
          type='password'
          value={user.password}
          onChange={onChange}
        />
        
        <SelectInput
          name='organization_id'
          label='Organization'
          value={organization?.id.toString() || user.organization_id?.toString()}
          onChange={(e) => {
            const org = organizations?.filter(_organization => _organization.id === Number(e.target.value))[0];
            if (org) setOrganization(org);
          }}
          options={organizations?.map(org => ({
            label: org.name,
            value: org.id.toString(),
          })) || []}
        />

        <button type="submit" className="submit-button">{isEdit ? 'Update' : 'Create'}</button>
      </Form>
    </div>
  );
};

export default UserForm;