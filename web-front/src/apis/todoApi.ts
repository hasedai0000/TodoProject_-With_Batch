import { TodoType } from '@/interfaces/Todo';
import { AxiosResponse } from 'axios';
import globalAxios, { IErrorResponse, isAxiosError, ResponseType } from './config';

/**
 * Todo一覧
 * @returns Todo一覧
 */
export const fetchTodoListApi = async () => {
  try {
    const { data }: AxiosResponse<TodoType[]> = await globalAxios.get('/todos');
    const res: ResponseType<TodoType[]> = {
      success: true,
      data: data.data.todos,
      message: 'Todo一覧を取得しました',
    };
    return res;
  } catch (error) {
    const res: ResponseType = {
      success: false,
      message: 'Todo一覧を取得できませんでした',
    };
    if (isAxiosError(error)) {
      const axiosError = error as IErrorResponse;
      res.message = axiosError.response?.data.message;
    }
    return res;
  }
};

/**
 * Todo詳細
 * @param todoId
 * @returns
 */
export const fetchTodoDetailApi = async (todoId: number) => {
  try {
    const { data }: AxiosResponse<TodoType> = await globalAxios.get(`/todos/${todoId}`);
    const res: ResponseType<TodoType> = {
      success: true,
      data: data.data.todo,
      message: 'Todo詳細を取得しました',
    };
    return res;
  } catch (error) {
    const res: ResponseType = {
      success: false,
      message: 'Todo詳細を取得できませんでした',
    };
    if (isAxiosError(error)) {
      const axiosError = error as IErrorResponse;
      res.message = axiosError.response?.data.message;
    }
    return res;
  }
};

/**
 * Todo作成
 * @param userId
 * @param title
 * @param content
 * @returns
 */
export const createTodoApi = async (userId: number, title: string, content: string) => {
  try {
    const { data }: AxiosResponse<TodoType> = await globalAxios.post('/todos', { user_id: userId, title, content });
    const res: ResponseType<TodoType> = {
      success: true,
      data: data.data.todo,
      message: 'Todoを作成しました',
    };
    return res;
  } catch (error) {
    const res: ResponseType = {
      success: false,
      message: 'Todoを作成できませんでした',
    };
    if (isAxiosError(error)) {
      const axiosError = error as IErrorResponse;
      res.message = axiosError.response?.data.message;
    }
    return res;
  }
};

/**
 * Todoを更新
 * @param todoId
 * @param title
 * @param content
 * @returns
 */
export const updateTodoApi = async (todoId: number, title: string, content: string) => {
  try {
    const { data }: AxiosResponse<TodoType> = await globalAxios.put(`/todos/${todoId}`, { title, content });
    const res: ResponseType<TodoType> = {
      success: true,
      data: data.data.todo,
      message: 'Todoを更新しました',
    };
    return res;
  } catch (error) {
    const res: ResponseType = {
      success: false,
      message: 'Todoを更新できませんでした',
    };
    if (isAxiosError(error)) {
      const axiosError = error as IErrorResponse;
      res.message = axiosError.response?.data.message;
    }
    return res;
  }
};

/**
 * Todoを削除
 * @param todoId
 * @returns
 */
export const deleteTodoApi = async (todoId: number) => {
  try {
    const { data }: AxiosResponse<TodoType> = await globalAxios.delete(`/todos/${todoId}`);
    const res: ResponseType<TodoType> = {
      success: true,
      data: data.data.todo,
      message: 'Todoを削除しました',
    };
    return res;
  } catch (error) {
    const res: ResponseType = {
      success: false,
      message: 'Todoを削除できませんでした',
    };
    if (isAxiosError(error)) {
      const axiosError = error as IErrorResponse;
      res.message = axiosError.response?.data.message;
    }
    return res;
  }
};
