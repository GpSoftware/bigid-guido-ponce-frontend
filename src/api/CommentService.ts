import { Comment, CreateComment, UpdateComment } from '../types/comments';
import axiosInstance from './fetcher';

export class CommentService {
  public static singleton = new CommentService();

  async getComments() {
    const { data } = await axiosInstance.get('/comments');
    
    if (!data.success) {
      throw new Error(data.message || 'Cannot get comments');
    }
    
    return data.data.comments;
  }

  async deleteComment(commentId: number) {
    try {
      const { data } = await axiosInstance.delete(`/comments/${commentId}`);
      if (!data.success) {
        throw new Error(data.message || 'Cannot get commentId');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.response.data.message || error.message);
    }
  }

  async getComment(id: number) {
    const { data } = await axiosInstance.get(`/comments/${id}`);
    
    if (!data.success) {
      throw new Error(data.message || 'Cannot get comments');
    }
    
    return data.data.comment;
  }

  async createComment(comment: CreateComment): Promise<Comment> {
    try {
      const { data } = await axiosInstance.post('/comments', comment);

      if (!data.success) {
        throw new Error(data.message || 'Cannot create comment');
      }
  
      return data.data.comment;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.response.data.message || error.message);
    }
  }

  async updateComment(commentId: number, comment: UpdateComment): Promise<Comment> {
    try {
      const { data } = await axiosInstance.patch(`/comments/${commentId}`, comment);

      if (!data.success) {
        throw new Error(data.message || 'Cannot update comment');
      }

      return data.data.comment;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.response.data.message || error.message);
    }
  }
}