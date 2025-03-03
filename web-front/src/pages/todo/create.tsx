/**
 * TodoCreate
 *
 * @package pages
 */

import { NextPage } from 'next';
import { TodoCreateTemplate } from '@/components/templates/TodoCreateTemplate';

/**
 * TodoCreatePage
 * @constructor
 */
export const TodoCreatePage: NextPage = () => <TodoCreateTemplate />;

export default TodoCreatePage;
