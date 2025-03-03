/**
 * TodoListTemplate
 *
 * @package components
 */

import { BaseLayout } from '@/components/organisms/BaseLayout';
import styles from './styles.module.css';
import { useTodoContext } from '@/contexts/TodoContext';
import { useTodoCreateTemplate } from './useTodoCreateTemplate';
import { InputForm } from '@/components/atoms/InputForm';
import { TextArea } from '@/components/atoms/TextArea';
import { CommonButton } from '@/components/atoms/CommonButton';
import { useAuthContext } from '@/contexts/AuthContext';

export const TodoCreateTemplate = () => {
  const { user } = useAuthContext();
  const { addTodo } = useTodoContext();
  const [{ inputTitle, inputContent }, { handleChangeInputTitle, handleChangeInputContent, handleCreateTodo }] =
    useTodoCreateTemplate({ addTodo, user });

  return (
    <BaseLayout title={'TodoCreate'}>
      <form className={styles.container} onSubmit={handleCreateTodo}>
        {/* Todo検索フォームエリア */}
        <div className={styles.area}>
          <InputForm placeholder={'New Todo'} value={inputTitle} onChange={handleChangeInputTitle} />
        </div>
        <div className={styles.area}>
          <TextArea placeholder={'New Content'} value={inputContent} onChange={handleChangeInputContent} />
        </div>
        <div className={styles.area}>
          <CommonButton type={'submit'} title="Create" />
        </div>
      </form>
    </BaseLayout>
  );
};
