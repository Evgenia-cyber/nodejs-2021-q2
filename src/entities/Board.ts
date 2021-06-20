import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 200 })
  title: string = 'default title';

  @Column({ type: 'json', nullable: true })
  columns: string;
}

export { Board };
