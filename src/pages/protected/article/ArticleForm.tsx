import { FC, useEffect, useState } from 'react';
import Form from '../../../components/Forms/Form';
import Input from '../../../components/Forms/Input/Input';
import { useNavigate, useParams } from 'react-router-dom';
import { useArticle, useCreateArticle, useUpdateArticle } from '../../../hooks/articles';
import TextArea from '../../../components/Forms/Input/TextArea';
import { validateRequest } from '../../../utils/validateRequest';
import { CreateArticle, UpdateArticle } from '../../../types/articles';

interface FormProps {
  isEdit?: boolean;
}

const ArticleForm: FC<FormProps> = ({ isEdit }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useArticle(id ? Number(id) : undefined);
  const { mutateAsync: updateArticle } = useUpdateArticle();
  const { mutateAsync: createArticle } = useCreateArticle();
  const [title, setTitle] = useState(data?.title || '');
  const [content, setContent] = useState(data?.content || '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data) setTitle(data.title);
    if (data) setContent(data.content);
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit && id) {
        const result = validateRequest({
          title,
          content
        }, UpdateArticle);
        if (!result.success) {
          throw new Error(result.errors.toString());
        }

        await updateArticle({
          articleId: Number(id),
          article: {
            title,
            content,
          }
        });
      } else {
        const result = validateRequest({
          title,
          content
        }, CreateArticle);
        if (!result.success) {
          throw new Error(result.errors.toString());
        }
        await createArticle({
          title,
          content
        });
      }

      setError(null);
      navigate('/articles');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message || `Cannot ${isEdit ? 'Update' : 'Create'} article`);
    }
  };

  return (
    <div className='form-container'>
      <h1>Article {isEdit ? 'Edit' : 'Creation'}</h1>
      <Form onSubmit={handleSubmit} error={error}>
        <Input
          name='title'
          required
          label='Article Title'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextArea 
          label={'Article Content'} 
          name={'content'}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit" className="submit-button">{isEdit ? 'Update' : 'Create'}</button>
      </Form>
    </div>
  );
};

export default ArticleForm;