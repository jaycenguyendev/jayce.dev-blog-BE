import { Post } from '@/databases/entities/Post';

class PostRepository {
  async getPosts() {
    const posts = await Post.find();
    return posts;
  }
}
export default new PostRepository();
