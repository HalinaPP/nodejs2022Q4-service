import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    length: 20,
  })
  name: string;

  @Column({ default: false })
  grammy: boolean;
}
