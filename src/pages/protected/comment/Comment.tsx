import '../styles.css';
import Table from '../../../components/Table/Table';
import { useComments } from '../../../hooks/comments/useComments';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../providers/AuthProvider';
import { useDeleteComment } from '../../../hooks/comments';

const Comments = () => {
  const { data: comments } = useComments();
  const { mutateAsync: deleteRecord } = useDeleteComment();
  const navigate = useNavigate();
  const { accountName } = useAuth();
  
  const deleteComment = async (id: number) => {
    const result = confirm('Are you sure you want to delete this comment?');

    if (result) {
      try {
        await deleteRecord(id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        alert(error.message || 'Cannot delete comment');
      }
    }
  }

  return (
    <>
    <div className='page-header'>
      <h1>Comments</h1>
    </div>
    <p style={{ fontSize: '14px' }}>You can delete only your own comments</p>
    <Table headers={['ID', 'Comment', 'Article Title', 'Article Id', 'Author', 'Actions']}>
      <tbody>
      {
        comments?.map((comment, idx) => (
          <tr key={idx}>
            <td>{comment.id}</td>
            <td>{comment.comment}</td>
            <td>{comment.article_title}</td>
            <td>{comment.article_id}</td>
            <td>{comment.author}</td>
            <td>
              {accountName === comment.author && <button style={{ padding: '10px', margin: '5px', backgroundColor: 'red' }} onClick={() => deleteComment(comment.id)}>Delete</button>}
              {accountName === comment.author && <button style={{ padding: '10px', margin: '5px' }} onClick={() => navigate(`/comments/${comment.id}`)}>Update</button>}
            </td>
          </tr>
        ))
      }
      </tbody>
    </Table>
    </>
  );
}

export default Comments;
