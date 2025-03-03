import { FC } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useSignUpTemplate } from './useSignUpTemplate';
import { InputForm } from '@/components/atoms/InputForm';
import { CommonButton } from '@/components/atoms/CommonButton';
import { NAVIGATION_LIST } from '@/constants/navigation';
import Link from 'next/link';
import styles from './style.module.css';

export const SignUpTemplate: FC = () => {
  const { signIn } = useAuthContext();
  const [
    { name, email, password, password_confirmation },
    { handleChangeName, handleChangeEmail, handleChangePassword, handleChangePasswordConfirmation, handleSignUp },
  ] = useSignUpTemplate({ signIn });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>SignUp</h1>
      <form className={styles.form} onSubmit={handleSignUp}>
        <div className={styles.area}>
          <InputForm type="text" value={name} placeholder="name" onChange={handleChangeName} />
        </div>
        <div className={styles.area}>
          <InputForm type="email" value={email} placeholder="email" onChange={handleChangeEmail} />
        </div>
        <div className={styles.area}>
          <InputForm type="password" value={password} placeholder="password" onChange={handleChangePassword} />
        </div>
        <div className={styles.area}>
          <InputForm
            type="password"
            value={password_confirmation}
            placeholder="password_confirmation"
            onChange={handleChangePasswordConfirmation}
          />
        </div>
        <div className={styles.area}>
          <CommonButton type="submit" title="signup" />
        </div>
        <div className={styles.link}>
          <Link href={NAVIGATION_LIST.SIGNIN}>&lt;&lt; to signin page</Link>
        </div>
      </form>
    </div>
  );
};
