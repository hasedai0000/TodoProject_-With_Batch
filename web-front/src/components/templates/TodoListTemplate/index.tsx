/**
 * TodoListTemplate
 *
 * @package components
 */

import { BaseLayout } from '@/components/organisms/BaseLayout';
import styles from './styles.module.css';
import { useTodoContext } from '@/contexts/TodoContext';
import { useTodoTemplate } from './useTodoTemplate';
import { InputForm } from '@/components/atoms/InputForm';
import { TodoList } from '@/components/organisms/TodoList';

export const TodoListTemplate = () => {
  const { originTodoList, deleteTodo } = useTodoContext();
  const [{ searchKeyword, showTodoList }, { handleChangeSearchWord, handleDeleteTodo }] = useTodoTemplate({
    originTodoList,
    deleteTodo,
  });

  return (
    <BaseLayout title={'TodoList'}>
      <div className={styles.container}>
        {/* Todo検索フォームエリア */}
        <div className={styles.area}>
          <InputForm placeholder={'Search Keyword'} value={searchKeyword} onChange={handleChangeSearchWord} />
        </div>
        {/* Todoリスト一覧表示 */}
        <div className={styles.area}>
          <TodoList todoList={showTodoList} handleDeleteTodo={handleDeleteTodo} />
        </div>
      </div>
    </BaseLayout>
  );
};
