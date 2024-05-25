'use client';
import { MutableRefObject, forwardRef } from 'react';
import styles from './button.module.sass';
import { concatStyles } from '../../../utils/styles.utils';

type ButtonProps = {
  children: string,
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'cancel' | 'white',
  type?: 'filled' | 'border' | 'empty',
  onClick: (e: React.MouseEvent<HTMLElement>) => void,
}

const button = forwardRef(({children, color = 'primary', type = 'border', onClick} : ButtonProps, ref: MutableRefObject<any>) => {
  return (
    <button ref={ref} onClick={onClick} className={concatStyles(styles['container'], styles[color], styles[type])}>{children}</button>
  );
});

export default button;