import '../styles.css';
import Table from '../../../components/Table/Table';
import { useArticles } from '../../../hooks/articles/useArticles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../providers/AuthProvider';
import { useDeleteArticle } from '../../../hooks/articles';

const Articles = () => {
  const { data: articles } = useArticles();
  const { mutateAsync: deleteRecord } = useDeleteArticle();
  const navigate = useNavigate();
  const { accountEmail } = useAuth();
  
  const deleteArticle = async (id: number) => {
    const result = confirm('Are you sure you want to delete this article? Article comments will be deleted');

    if (result) {
      try {
        await deleteRecord(id);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        alert('Cannot delete article');
      }
    }
  }

  return (
    <>
    <div className='page-header'>
      <h1>Articles</h1>
      <button onClick={() => navigate('/articles/create')}>Create Article</button>
    </div>
    <p style={{ fontSize: '14px' }}>You can delete only your own articles. Deleting articles, will delete related comments</p>
    <Table headers={['ID', 'Title', 'Content', 'Author', 'Amount Of Comments', 'Actions']}>
      <tbody>
      {
        articles?.map((article, idx) => (
          <tr key={idx}>
            <td>{article.id}</td>
            <td>{article.title}</td>
            <td>{article.content}</td>
            <td>{article.author}</td>
            <td>{article.amount_of_comments}</td>
            <td>
              {accountEmail === article.author && <button style={{ padding: '10px', margin: '5px', backgroundColor: 'red' }} onClick={() => deleteArticle(article.id)}>Delete</button>}
              {accountEmail === article.author && <button onClick={() => navigate(`/articles/${article.id}`)} style={{ padding: '10px', margin: '5px' }}>Update</button>}
              <button onClick={() => navigate(`/articles/${article.id}/comment/create`)} style={{ padding: '10px', margin: '5px' }}>Create Comment</button>
            </td>
          </tr>
        ))
      }
      </tbody>
    </Table>
    </>
  );
}

export default Articles;
