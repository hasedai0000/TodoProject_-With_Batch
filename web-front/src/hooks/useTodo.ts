/**
 * useTodo
 *
 * @package hooks
 */

import { createTodoApi, deleteTodoApi, fetchTodoListApi, updateTodoApi } from '@/apis/todoApi';
import { useAuthContext } from '@/contexts/AuthContext';
import { TodoType } from '@/interfaces/Todo';
import { useCallback, useEffect, useState } from 'react';

/**
 * useTodo
 */
export const useTodo = () => {
  const { isAuth } = useAuthContext();
  /** todo list */
  const [originTodoList, setOriginTodoList] = useState<Array<TodoType>>([]);

  const fetchTodoList = useCallback(async () => {
    const res = await fetchTodoListApi();
    if (res.success) {
      setOriginTodoList(res?.data && typeof res.data === 'object' ? res.data : []);
    }
  }, [isAuth]);

  /**
   * Todo作成処理
   * @param {number} userId
   * @param {string} title
   * @param {string} content
   */
  const addTodo = useCallback(
    async (userId: number, title: string, content: string) => {
      const res = await createTodoApi(userId, title, content);
      if (!res?.data || typeof res.data !== 'object') return;
      const newTodoList = [...originTodoList, res.data];
      setOriginTodoList(newTodoList);
    },
    [originTodoList]
  );

  /**
   * Todo更新処理
   * @param {number} id
   * @param {string} title
   * @param {string} content
   */
  const updateTodo = useCallback(
    async (id: number, title: string, content: string) => {
      const res = await updateTodoApi(id, title, content);
      if (!res?.data || typeof res.data !== 'object') return;
      const updatedTodoList = originTodoList.map((todo) => {
        if (res?.data?.id === todo.id) {
          return {
            id: res.data.id,
            title: res.data.title,
            content: res.data.content,
            createdAt: res.data.createdAt,
            updatedAt: res.data.updatedAt,
          };
        }
        return todo;
      });
      setOriginTodoList(updatedTodoList);
    },
    [originTodoList]
  );

  /**
   * todoを削除
   * @param { number } todoId
   */
  const deleteTodo = useCallback(
    async (todoId: number) => {
      const res = await deleteTodoApi(todoId);
      if (!res.data || typeof res.data !== 'object') return;
      // todoを削除したtodo listで更新
      setOriginTodoList(originTodoList.filter((todo) => todo.id !== res?.data?.id));
    },
    [isAuth]
  );

  useEffect(() => {
    if (isAuth) fetchTodoList();
  }, [fetchTodoList, isAuth]);

  return { addTodo, originTodoList, deleteTodo, updateTodo };
};
