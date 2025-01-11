import { FC, useEffect, useState } from 'react';
import Form from '../../../components/Forms/Form';
import Input from '../../../components/Forms/Input/Input';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateComment, useCreateComment, useComment } from '../../../hooks/comments';

interface FormProps {
  isEdit?: boolean;
}

const CommentForm: FC<FormProps> = ({ isEdit }) => {
  const navigate = useNavigate();
  const { id, articleId } = useParams();
  const { data } = useComment(id ? Number(id) : undefined);
  const { mutateAsync: createComment } = useCreateComment();
  const { mutateAsync: updateComment } = useUpdateComment();
  const [content, setContent] = useState(data?.comment || '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data) setContent(data.comment);
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit && id) {
        if (content.length < 6) {
          throw new Error('Content length should be greater than 6');
        }
        await updateComment({
          commentId: Number(id),
          comment: { comment: content },
        });
      } else {
        if (!articleId) throw new Error('Missing article identifier');
        if (content.length < 6) {
          throw new Error('Content length should be greater than 6');
        }
        await createComment({
          article_id: Number(articleId),
          comment: content,
        });
      }
      
      setError(null);
      navigate('/comments');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message || `Cannot ${isEdit ? 'Update' : 'Create'} comment`);
    }
  };

  return (
    <div className='form-container'>
      <h1>Comment {isEdit ? 'Edit' : 'Creation'}</h1>
      <Form onSubmit={handleSubmit} error={error}>
        <Input
          name='comment'
          required
          label='Comment'
          type='text'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className="submit-button">{isEdit ? 'Update' : 'Create'}</button>
      </Form>
    </div>
  );
};

export default CommentForm;