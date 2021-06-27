import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 200 })
  name: string;

  @Column('varchar', { length: 200 })
  login: string;

  @Column('varchar', { length: 200 })
  password: string;
}

export { User };
