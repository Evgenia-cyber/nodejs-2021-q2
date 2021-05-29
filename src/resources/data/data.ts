import { IUser } from '../users/user.types';
import { IBoard } from '../boards/board.types';

/**
 * All database users
 * @type {User[]}
 */
const USERS: IUser[] = [];

/**
 * All database boards
 *
 * @type {Board[]}
 */
const BOARDS: IBoard[] = [];

/**
 * All database tasks
 *
 * @type {Task[]}
 */
const TASKS: any = [];

export { USERS, BOARDS, TASKS };