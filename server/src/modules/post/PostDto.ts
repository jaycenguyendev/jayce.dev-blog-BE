import { Post } from '@/databases/entities/Post';

// ResponsePostDto represents the post data
export class ResponsePostDto {
  post: Array<Partial<Post>>;

  constructor(data: Array<Partial<Post>>) {
    this.post = data;
  }
}
