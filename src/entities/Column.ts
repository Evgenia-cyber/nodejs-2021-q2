import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class MyColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 200 })
  title: string = 'default title';

  @Column('integer')
  order: number = 0;
}

export { MyColumn };
