/**
 * useNavigation
 *
 * @package components
 */

import { logoutApi } from '@/apis/authApi';
import { NAVIGATION_LIST } from '@/constants/navigation';
import { EventType } from '@/interfaces/Event';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

type Props = {
  signOut: () => Promise<void>;
};

type Actions = {
  handleLogout: EventType['onSubmitButton'];
};

/**
 * useNavigation
 */
export const useNavigation = ({ signOut }: Props) => {
  const router = useRouter();

  /**
   * ログアウト処理
   */
  const handleLogout: EventType['onSubmitButton'] = useCallback(
    async (e) => {
      e.preventDefault;
      const res = await logoutApi();
      if (res?.success) {
        signOut();
        localStorage.removeItem('access_token');
        router.push(NAVIGATION_LIST.SIGNIN);
      }
    },
    [signOut, router]
  );

  const actions: Actions = {
    handleLogout,
  };

  return actions;
};
