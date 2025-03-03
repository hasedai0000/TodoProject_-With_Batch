/**
 * useTodoTemplate
 *
 * @package hooks
 */

import { EventType } from '@/interfaces/Event';
import { TodoType } from '@/interfaces/Todo';
import { useCallback, useMemo, useState } from 'react';

type Params = {
  originTodoList: Array<TodoType>;
  deleteTodo: (todoId: number) => Promise<void>;
};

type StatesType = {
  searchKeyword: string;
  showTodoList: Array<TodoType>;
};

type ActionsType = {
  handleChangeSearchWord: EventType['onChangeInput'];
  handleDeleteTodo: (todoId: number, todoTitle: string) => Promise<void>;
};

export const useTodoTemplate = ({ originTodoList, deleteTodo }: Params) => {
  // 検索キーワード
  const [searchKeyword, setSearchKeyword] = useState('');
  // 表示用TodoList
  const showTodoList = useMemo(() => {
    const regexp = new RegExp('^' + searchKeyword, 'i');
    return originTodoList?.filter((todo) => {
      // 検索キーワードに部分一致したTodoだけを一覧表示する
      return todo.title.match(regexp);
    });
  }, [originTodoList, searchKeyword]);

  // 検索キーワードを変更する
  const handleChangeSearchWord: EventType['onChangeInput'] = useCallback((e) => {
    setSearchKeyword(e.target.value);
  }, []);

  // todoを削除する
  const handleDeleteTodo = useCallback(
    async (todoId: number, todoTitle: string) => {
      if (window.confirm(`「${todoTitle}」を削除しますか？`)) {
        await deleteTodo(todoId);
      }
    },
    [deleteTodo]
  );

  const states: StatesType = {
    searchKeyword,
    showTodoList,
  };

  const actions: ActionsType = {
    handleChangeSearchWord,
    handleDeleteTodo,
  };

  return [states, actions] as const;
};
