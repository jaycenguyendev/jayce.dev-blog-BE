import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post';

@Index('post_comment_pkey', ['id'], { unique: true })
@Index('idx_comment_parent', ['parentId'], {})
@Index('idx_comment_post', ['postId'], {})
@Entity('post_comment', { schema: 'dev' })
export class PostComment extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'postId' })
  postId: string;

  @Column('bigint', { name: 'parentId', nullable: true })
  parentId: string | null;

  @Column('character varying', { name: 'title', length: 255 })
  title: string;

  @Column('boolean', { name: 'published', default: () => 'false' })
  published: boolean;

  @Column('timestamp without time zone', {
    name: 'createdAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'publishedAt',
    nullable: true,
  })
  publishedAt: Date | null;

  @Column('text', { name: 'content', nullable: true })
  content: string | null;

  @ManyToOne(() => PostComment, (postComment) => postComment.postComments)
  @JoinColumn([{ name: 'parentId', referencedColumnName: 'id' }])
  parent: PostComment;

  @OneToMany(() => PostComment, (postComment) => postComment.parent)
  postComments: PostComment[];

  @ManyToOne(() => Post, (post) => post.postComments)
  @JoinColumn([{ name: 'postId', referencedColumnName: 'id' }])
  post: Post;
}
