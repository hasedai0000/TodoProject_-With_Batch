/**
 * useSignInTemplate
 *
 * @package components/templates/SignInTemplate
 */

import { signInApi } from '@/apis/authApi';
import { NAVIGATION_PATH } from '@/constants/navigation';
import { EventType } from '@/interfaces/Event';
import { UserType } from '@/interfaces/User';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

type Props = {
  signIn: (user: UserType) => Promise<void>;
};

type StatesType = {
  email: string;
  password: string;
};

type ActionsType = {
  handleChangeEmail: EventType['onChangeInput'];
  handleChangePassword: EventType['onChangeInput'];
  handleLogin: EventType['onSubmit'];
};

/**
 * useSignInTemplate
 * @param param0
 * @returns
 */
export const useSignInTemplate = ({ signIn }: Props) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  /**
   * emailの更新処理
   */
  const handleChangeEmail: EventType['onChangeInput'] = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  /**
   * passwordの更新処理
   */
  const handleChangePassword: EventType['onChangeInput'] = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  /**
   * ログイン処理
   */
  const handleLogin: EventType['onSubmit'] = useCallback(
    async (event) => {
      event.preventDefault();
      const res = await signInApi(email, password);
      if (res?.data) {
        signIn(res.data.user);
        localStorage.setItem('access_token', res.data.token);
        router.push(NAVIGATION_PATH.TOP);
      }
    },
    [email, password, router, signIn]
  );

  const states: StatesType = {
    email,
    password,
  };

  const actions: ActionsType = {
    handleChangeEmail,
    handleChangePassword,
    handleLogin,
  };

  return [states, actions] as const;
};
