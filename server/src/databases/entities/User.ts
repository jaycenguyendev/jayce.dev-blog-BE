import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post';

@Index('user_email_key', ['email'], { unique: true })
@Index('user_pkey', ['id'], { unique: true })
@Index('user_mobile_key', ['mobile'], { unique: true })
@Entity('user', { schema: 'dev' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('character varying', {
    name: 'firstName',
    nullable: true,
    length: 50,
  })
  firstName: string | null;

  @Column('character varying', {
    name: 'middleName',
    nullable: true,
    length: 50,
  })
  middleName: string | null;

  @Column('character varying', { name: 'lastName', nullable: true, length: 50 })
  lastName: string | null;

  @Column('character varying', {
    name: 'mobile',
    nullable: true,
    unique: true,
    length: 15,
  })
  mobile: string | null;

  @Column('character varying', {
    name: 'email',
    nullable: true,
    unique: true,
    length: 255,
  })
  email: string | null;

  @Column('character varying', { name: 'passwordHash', length: 32 })
  passwordHash: string;

  @Column('timestamp without time zone', { name: 'registeredAt' })
  registeredAt: Date;

  @Column('timestamp without time zone', { name: 'lastLogin', nullable: true })
  lastLogin: Date | null;

  @Column('text', { name: 'intro', nullable: true })
  intro: string | null;

  @Column('text', { name: 'profile', nullable: true })
  profile: string | null;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
