import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 200 })
  title: string = 'default title';

  @Column('integer')
  order: number = 0;

  @Column('text')
  description: string = 'default description';

  @Column({ type: 'varchar', length: 40, nullable: true })
  userId: string | null | undefined;

  @Column({ type: 'varchar', length: 40, nullable: true })
  boardId: string | null | undefined;

  @Column({ type: 'varchar', length: 40, nullable: true })
  columnId: string | null | undefined;
}

export { Task };
