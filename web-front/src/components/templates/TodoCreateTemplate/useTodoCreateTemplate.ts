/**
 * useTodoTemplate
 *
 * @package hooks
 */

import { NAVIGATION_PATH } from '@/constants/navigation';
import { EventType } from '@/interfaces/Event';
import { UserType } from '@/interfaces/User';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';

type Params = {
  addTodo: (userId: number, title: string, content: string) => void;
  user: UserType | undefined;
};

type StatesType = {
  inputTitle: string;
  inputContent: string;
};

type ActionsType = {
  handleChangeInputTitle: EventType['onChangeInput'];
  handleChangeInputContent: EventType['onChangeTextArea'];
  handleCreateTodo: EventType['onSubmit'];
};

export const useTodoCreateTemplate = ({ addTodo, user }: Params) => {
  const router = useRouter();

  /** local state */
  const [inputTitle, setInputTitle] = useState('');
  const [inputContent, setInputContent] = useState('');

  /**
   * 「title」変更処理
   * @type {function(*): void}
   */
  const handleChangeInputTitle: EventType['onChangeInput'] = useCallback((e) => {
    setInputTitle(e.target.value);
  }, []);

  /**
   * 「content」変更処理
   * @type {function(*): void}
   */
  const handleChangeInputContent: EventType['onChangeTextArea'] = useCallback((e) => {
    setInputContent(e.target.value);
  }, []);

  // Todo追加処理
  const handleCreateTodo: EventType['onSubmit'] = useCallback(
    async (e) => {
      e.preventDefault();
      if (!user) return;
      await addTodo(user.id, inputTitle, inputContent);
      router.push(NAVIGATION_PATH.TOP);
    },
    [addTodo, inputTitle, inputContent, router, user]
  );

  const states: StatesType = {
    inputTitle,
    inputContent,
  };

  const actions: ActionsType = {
    handleChangeInputTitle,
    handleChangeInputContent,
    handleCreateTodo,
  };

  return [states, actions] as const;
};
