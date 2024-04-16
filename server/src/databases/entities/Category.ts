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
import { Post } from './Post';

@Index('category_pkey', ['id'], { unique: true })
@Index('idx_category_parent', ['parentId'], {})
@Entity('category', { schema: 'dev' })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

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

  @Column('text', { name: 'content', nullable: true })
  content: string | null;

  @ManyToOne(() => Category, (category) => category.categories)
  @JoinColumn([{ name: 'parentId', referencedColumnName: 'id' }])
  parent: Category;

  @OneToMany(() => Category, (category) => category.parent)
  categories: Category[];

  @ManyToMany(() => Post, (post) => post.categories)
  @JoinTable({
    name: 'post_category',
    joinColumns: [{ name: 'categoryId', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'postId', referencedColumnName: 'id' }],
    schema: 'dev',
  })
  posts: Post[];
}
