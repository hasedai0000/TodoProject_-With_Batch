/**
 * TodoListTemplate
 *
 * @package components
 */

import { BaseLayout } from '@/components/organisms/BaseLayout';
import styles from './styles.module.css';

import { useTodoDetailTemplate } from './useTodoDetailTemplate';
import { InputForm } from '@/components/atoms/InputForm';
import { TextArea } from '@/components/atoms/TextArea';

export const TodoDetailTemplate = () => {
  const [{ todo }] = useTodoDetailTemplate();

  return (
    <BaseLayout title={'TodoDetail'}>
      <div className={styles.container}>
        {/* Todo検索フォームエリア */}
        <div className={styles.area}>
          <InputForm disabled placeholder={'Title'} value={todo?.title} />
        </div>
        {/* Todoリスト一覧表示 */}
        <div className={styles.area}>
          <TextArea disabled placeholder={'Content'} value={todo?.content} />
        </div>
      </div>
    </BaseLayout>
  );
};
