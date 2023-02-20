import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', array: true, default: [] })
  artists: string[];

  @Column({ type: 'uuid', array: true, default: [] })
  albums: string[];

  @Column({ type: 'uuid', array: true, default: [] })
  tracks: string[];
}
