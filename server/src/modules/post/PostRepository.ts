import { Post } from '@/databases/entities/Post';
import { PaginationQuery } from '@/modules/post/Post.type';

class PostRepository {
  async getPosts(paginationQuery?: PaginationQuery) {
    const posts = await Post.find({
      relations: {
        tags: true
      },
      order: {
        createdAt: "DESC"
      },
      ...(paginationQuery?.limit && paginationQuery?.skip && {
        skip: paginationQuery.skip,
        take: paginationQuery.limit
      })
    });
    return posts;
  }
}
export default new PostRepository();
