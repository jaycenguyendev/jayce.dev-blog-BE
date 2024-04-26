import { Post } from '@/databases/entities/Post';
import { PaginationQuery } from '@/modules/post/Post.type';
import { FindManyOptions } from 'typeorm';

class PostRepository {
  async getPosts(paginationQuery?: PaginationQuery) {
    const query: FindManyOptions = {
      skip: paginationQuery?.skip,
      take: paginationQuery?.limit
    }

    const [posts, totalPosts] = await Post.findAndCount({
      relations: {
        tags: true
      },
      order: {
        createdAt: "DESC"
      },
      ...query,
    });

    return {
      posts,
      totalPosts
    };
  }
}
export default new PostRepository();
