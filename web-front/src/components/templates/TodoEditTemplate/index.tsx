/**
 * TodoListTemplate
 *
 * @package components
 */

import { BaseLayout } from '@/components/organisms/BaseLayout';
import styles from './styles.module.css';

import { useTodoEditTemplate } from './useTodoEditTemplate';
import { InputForm } from '@/components/atoms/InputForm';
import { TextArea } from '@/components/atoms/TextArea';
import { useTodoContext } from '@/contexts/TodoContext';
import { CommonButton } from '@/components/atoms/CommonButton';

export const TodoEditTemplate = () => {
  const { originTodoList, updateTodo } = useTodoContext();
  const [{ todo, inputTitle, inputContent }, { handleChangeInputTitle, handleChangeInputContent, handleUpdateTodo }] =
    useTodoEditTemplate({ originTodoList, updateTodo });

  return (
    <BaseLayout title={'TodoDetail'}>
      {!!todo && (
        <form className={styles.container} onSubmit={handleUpdateTodo}>
          <div className={styles.area}>
            <InputForm placeholder={'Title'} value={inputTitle} onChange={handleChangeInputTitle} />
          </div>
          <div className={styles.area}>
            <TextArea placeholder={'Content'} value={inputContent} onChange={handleChangeInputContent} />
          </div>
          <div className={styles.area}>
            <CommonButton type="submit" title="Edit Todo" />
          </div>
        </form>
      )}
    </BaseLayout>
  );
};
