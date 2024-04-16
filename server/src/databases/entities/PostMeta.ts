import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post';

@Index('post_meta_pkey', ['id'], { unique: true })
@Index('uq_post_meta', ['key', 'postId'], { unique: true })
@Index('idx_meta_post', ['postId'], {})
@Entity('post_meta', { schema: 'dev' })
export class PostMeta extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'postId' })
  postId: string;

  @Column('character varying', { name: 'key', length: 255 })
  key: string;

  @Column('text', { name: 'content', nullable: true })
  content: string | null;

  @ManyToOne(() => Post, (post) => post.postMetas)
  @JoinColumn([{ name: 'postId', referencedColumnName: 'id' }])
  post: Post;
}
