import { Post } from '@/databases/entities/Post';

// ResponsePostDto represents the post data
export class ResponsePostDto {
  posts: Array<Partial<Post>>;
  totalPages?: number;

  constructor(posts: Array<Partial<Post>>, totalPages?: number) {
    this.posts = posts;
    this.totalPages = totalPages
  }
}
