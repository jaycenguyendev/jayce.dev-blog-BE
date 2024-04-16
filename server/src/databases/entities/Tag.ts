import { BaseEntity, Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post';

@Index('tag_pkey', ['id'], { unique: true })
@Entity('tag', { schema: 'dev' })
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

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

  @Column('text', { name: 'content', nullable: true })
  content: string | null;

  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];
}
