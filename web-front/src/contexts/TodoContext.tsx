/**
 * TodoContext
 *
 * @package contexts
 */

import { useTodo } from '@/hooks/useTodo';
import { TodoType } from '@/interfaces/Todo';
import { createContext, FC, ReactNode, useContext } from 'react';

type Props = {
  children: ReactNode;
};

type ContextType = {
  addTodo: (userId: number, title: string, content: string) => Promise<void>;
  originTodoList: Array<TodoType>;
  deleteTodo: (todoId: number) => Promise<void>;
  updateTodo: (todoId: number, title: string, content: string) => Promise<void>;
};

const TodoContext = createContext({} as ContextType);

/**
 * TodoProvider
 *
 * @package contexts
 */
export const TodoProvider: FC<Props> = ({ children }) => {
  // カスタムフックから状態とロジックを呼び出してコンテキストプロバイダーにあてがう
  const { addTodo, originTodoList, deleteTodo, updateTodo } = useTodo();

  return (
    <TodoContext.Provider value={{ addTodo, originTodoList, deleteTodo, updateTodo }}>{children}</TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
