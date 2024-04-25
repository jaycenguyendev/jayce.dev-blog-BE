import { PaginationQuery } from '@/modules/post/Post.type';
import { ResponsePostDto } from '@/modules/post/PostDto';
import postsRepository from '@/modules/post/PostRepository';

class PostService {
  async getPosts(paginationQuery?: PaginationQuery): Promise<ResponsePostDto['post']> {
    const posts = await postsRepository.getPosts(paginationQuery);
    return new ResponsePostDto(posts).post;
  }
}
export default new PostService();
