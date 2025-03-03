/**
 * BaseLayout
 *
 * @package components
 */

import { FC, ReactNode } from 'react';

import styles from './styles.module.css';
import { Navigation } from '@/components/molecules/Navigation';

type Props = {
  title: string;
  children: ReactNode;
};

/**
 * BaseLayout
 */
export const BaseLayout: FC<Props> = ({ title, children }) => {
  return (
    <div>
      <header className={styles.header}>
        <Navigation />
      </header>
      <main className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        {children}
      </main>
    </div>
  );
};
