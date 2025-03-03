/**
 * useSignUpTemplate
 *
 * @package components/templates/SignUpTemplate
 */

import { signUpApi } from '@/apis/authApi';
import { NAVIGATION_PATH } from '@/constants/navigation';
import { EventType } from '@/interfaces/Event';
import { UserType } from '@/interfaces/User';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

type Props = {
  signIn: (user: UserType) => Promise<void>;
};

type StatesType = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type ActionsType = {
  handleChangeName: EventType['onChangeInput'];
  handleChangeEmail: EventType['onChangeInput'];
  handleChangePassword: EventType['onChangeInput'];
  handleChangePasswordConfirmation: EventType['onChangeInput'];
  handleSignUp: EventType['onSubmit'];
};

/**
 * useSignUpTemplate
 * @param param0
 * @returns
 */
export const useSignUpTemplate = ({ signIn }: Props) => {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password_confirmation, setPasswordConfirmation] = useState<string>('');

  /**
   * nameの更新処理
   */
  const handleChangeName: EventType['onChangeInput'] = useCallback((event) => {
    setName(event.target.value);
  }, []);

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
   * password_confirmationの更新処理
   */
  const handleChangePasswordConfirmation: EventType['onChangeInput'] = useCallback((event) => {
    setPasswordConfirmation(event.target.value);
  }, []);

  /**
   * 会員登録処理
   */
  const handleSignUp: EventType['onSubmit'] = useCallback(
    async (event) => {
      event.preventDefault();
      const res = await signUpApi(name, email, password, password_confirmation);
      if (res?.data) {
        signIn(res.data.user);
        localStorage.setItem('access_token', res.data.token || '');
        router.push(NAVIGATION_PATH.TOP);
      }
    },
    [name, email, password, password_confirmation, router, signIn]
  );

  const states: StatesType = {
    name,
    email,
    password,
    password_confirmation,
  };

  const actions: ActionsType = {
    handleChangeName,
    handleChangeEmail,
    handleChangePassword,
    handleChangePasswordConfirmation,
    handleSignUp,
  };

  return [states, actions] as const;
};
