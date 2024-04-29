import { PaginationQuery } from '@/modules/post/Post.type';
import { ResponsePostDto } from '@/modules/post/PostDto';
import postsRepository from '@/modules/post/PostRepository';

class PostService {
  async getPosts(paginationQuery?: PaginationQuery): Promise<ResponsePostDto> {
    const { posts, totalPosts } = await postsRepository.getPosts(paginationQuery);
    const totalPages = paginationQuery?.limit && Math.ceil(totalPosts / paginationQuery?.limit);
    return new ResponsePostDto(posts, totalPages);
  }

  async searchPost(query) {
    const posts = await postsRepository.searchPost(query)
    return new ResponsePostDto(posts);
  }
}
export default new PostService();
