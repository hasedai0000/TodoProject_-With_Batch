/**
 * TextArea
 *
 * @package components
 */

import { FC } from 'react';
import styles from './style.module.css';

type Props = JSX.IntrinsicElements['textarea'];
/**
 * TextArea
 * @param disabled
 * @param value
 * @param placeholder
 * @param onChange
 * @param onKeyDown
 * @returns
 */
export const TextArea: FC<Props> = ({ disabled = false, value, placeholder, onChange }) => {
  return (
    <textarea disabled={disabled} className={styles.text} placeholder={placeholder} value={value} onChange={onChange} />
  );
};
