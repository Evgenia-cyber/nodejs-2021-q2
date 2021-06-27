import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { MyColumn } from './Column';

@Entity()
class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 200 })
  title: string = 'default title';

  //   @Column({ type: 'json', nullable: true })
  //   columns: string;
  @OneToMany(() => MyColumn, (column) => column.board, {
    cascade: true,
  })
  columns: MyColumn[];
}

export { Board };
