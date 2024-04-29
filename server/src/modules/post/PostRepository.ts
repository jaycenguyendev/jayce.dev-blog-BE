import { pgDatabase } from '@/databases/PgDatabase';
import { Post } from '@/databases/entities/Post';
import { PaginationQuery } from '@/modules/post/Post.type';
import { FindManyOptions, Raw } from 'typeorm';

class PostRepository {
  private postRepository = pgDatabase.dataSource.getRepository(Post);
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

  async searchPost(query) {
    return await this.postRepository.find({
      relations: {
        tags: true
      },
      order: {
        createdAt: "DESC"
      },
      where: {
        title: Raw((alias) => `LOWER(${alias}) Like LOWER(:value)`, {
          value: `%${query}%`,
        })
      },
    });
  }
}
export default new PostRepository();
