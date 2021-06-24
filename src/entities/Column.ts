import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { Board } from './Board';

@Entity()
class MyColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 200 })
  title: string = 'default title';

  @Column('integer')
  order: number = 0;

  @ManyToOne(() => Board, (board) => board.columns, {
    onDelete: 'CASCADE',
  })
  board: Board;
}

export { MyColumn };
