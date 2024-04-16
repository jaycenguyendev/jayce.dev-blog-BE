import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Category } from './Category';
import { PostComment } from './PostComment';
import { PostMeta } from './PostMeta';
import { Tag } from './Tag';

@Index('idx_post_user', ['authorId'], {})
@Index('post_pkey', ['id'], { unique: true })
@Index('idx_post_parent', ['parentId'], {})
@Index('uq_slug', ['slug'], { unique: true })
@Entity('post', { schema: 'dev' })
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'authorId' })
  authorId: string;

  @Column('bigint', { name: 'parentId', nullable: true })
  parentId: string | null;

  @Column('character varying', { name: 'title', length: 255 })
  title: string;

  @Column('character varying', {
    name: 'metaTitle',
    nullable: true,
    length: 255,
  })
  metaTitle: string | null;

  @Column('character varying', { name: 'slug', length: 255 })
  slug: string;

  @Column('text', { name: 'summary', nullable: true })
  summary: string | null;

  @Column('boolean', { name: 'published', default: () => 'false' })
  published: boolean;

  @Column('timestamp without time zone', {
    name: 'createdAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', { name: 'updatedAt', nullable: true })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'publishedAt',
    nullable: true,
  })
  publishedAt: Date | null;

  @Column('text', { name: 'content', nullable: true })
  content: string | null;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn([{ name: 'authorId', referencedColumnName: 'id' }])
  author: User;

  @ManyToOne(() => Post, (post) => post.posts)
  @JoinColumn([{ name: 'parentId', referencedColumnName: 'id' }])
  parent: Post;

  @OneToMany(() => Post, (post) => post.parent)
  posts: Post[];

  @ManyToMany(() => Category, (category) => category.posts)
  categories: Category[];

  @OneToMany(() => PostComment, (postComment) => postComment.post)
  postComments: PostComment[];

  @OneToMany(() => PostMeta, (postMeta) => postMeta.post)
  postMetas: PostMeta[];

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable({
    name: 'post_tag',
    joinColumns: [{ name: 'postId', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'tagId', referencedColumnName: 'id' }],
    schema: 'dev',
  })
  tags: Tag[];
}
