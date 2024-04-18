import { ResponsePostDto } from '@/modules/post/PostDto';
import postsRepository from '@/modules/post/PostRepository';

class PostService {
  async getPosts(): Promise<ResponsePostDto> {
    const posts = await postsRepository.getPosts();
    return new ResponsePostDto(posts);
  }
}
export default new PostService();
