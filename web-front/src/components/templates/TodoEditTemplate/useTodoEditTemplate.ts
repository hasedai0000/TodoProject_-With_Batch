/**
 * useTodoEditTemplate
 *
 * @package hooks
 */

import { NAVIGATION_PATH } from '@/constants/navigation';
import { EventType } from '@/interfaces/Event';
import { TodoType } from '@/interfaces/Todo';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';

type Props = {
  originTodoList: Array<TodoType>;
  updateTodo: (todoId: number, title: string, content: string) => void;
};

type StatesType = {
  todo: TodoType | undefined;
  inputTitle: string;
  inputContent: string;
};

type ActionsType = {
  handleChangeInputTitle: EventType['onChangeInput'];
  handleChangeInputContent: EventType['onChangeTextArea'];
  handleUpdateTodo: EventType['onSubmit'];
};

/**
 * useTodoEditTemplate
 */
export const useTodoEditTemplate = ({ originTodoList, updateTodo }: Props) => {
  const router = useRouter();
  const todo = useMemo(
    () => originTodoList.find((todo) => String(todo.id) === router?.query?.id),
    [router?.query?.id, originTodoList]
  );

  /** Local States */
  const [inputTitle, setInputTitle] = useState<string>(todo?.title || '');
  const [inputContent, setInputContent] = useState<string>(todo?.content || '');

  /**
   * 「title」　の更新処理
   */
  const handleChangeInputTitle: EventType['onChangeInput'] = useCallback((e) => {
    setInputTitle(e.target.value);
  }, []);

  /**
   * 「content」　の更新処理
   */
  const handleChangeInputContent: EventType['onChangeTextArea'] = useCallback((e) => {
    setInputContent(e.target.value);
  }, []);

  /**
   * Todo更新処理
   *
   * @type {(function(*): void) | *}
   */
  const handleUpdateTodo: EventType['onSubmit'] = useCallback(
    (e) => {
      e.preventDefault();
      if (!!todo?.id && inputTitle !== '' && inputContent !== '') {
        updateTodo(todo?.id, inputTitle, inputContent);
        router.push(NAVIGATION_PATH.TOP);
      }
    },
    [router, todo?.id, inputTitle, inputContent, updateTodo]
  );

  const states: StatesType = {
    todo,
    inputTitle,
    inputContent,
  };

  const actions: ActionsType = {
    handleChangeInputTitle,
    handleChangeInputContent,
    handleUpdateTodo,
  };

  return [states, actions] as const;
};
