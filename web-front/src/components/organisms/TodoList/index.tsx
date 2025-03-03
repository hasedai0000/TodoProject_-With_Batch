/**
 * BaseLayout
 *
 * @package components
 */

import { FC } from 'react';

import styles from './styles.module.css';
import { TodoType } from '@/interfaces/Todo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faPenToSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useTodoList } from './useTodoList';

type Props = {
  todoList: Array<TodoType>;
  handleDeleteTodo: (todoId: number, todoTitle: string) => Promise<void>;
};

/**
 * BaseLayout
 */
export const TodoList: FC<Props> = ({ todoList, handleDeleteTodo }) => {
  const [{ handleMoveDetailPage, handleMoveEditPage }] = useTodoList();

  return (
    <ul className={styles.list}>
      {todoList.map((todo) => (
        <li key={todo.id} className={styles.todo}>
          <span className={styles.task}>{todo.title}</span>
          <div className={styles.area}>
            <div className={styles.far}>
              <FontAwesomeIcon icon={faFile} size="lg" onClick={() => handleMoveDetailPage(todo.id)} />
            </div>
            <div className={styles.far}>
              <FontAwesomeIcon icon={faPenToSquare} size="lg" onClick={() => handleMoveEditPage(todo.id)} />
            </div>
            <div className={styles.far}>
              <FontAwesomeIcon icon={faTrashAlt} size="lg" onClick={() => handleDeleteTodo(todo.id, todo.title)} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
