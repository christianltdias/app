'use client';
import { MutableRefObject, forwardRef } from 'react';
import { concatStyles } from '../../../../utils/styles.utils';
import styles from './button.module.sass';

export type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'cancel' | 'white';
export type ButtonType = 'filled' | 'border' | 'empty';

type ButtonProps = {
  children: string,
  onClick: (e: React.MouseEvent<HTMLElement>) => void,
  color?: ButtonColor,
  type?: ButtonType,
}

const Button = forwardRef(({children, color = 'primary', type = 'border', onClick} : ButtonProps, ref: MutableRefObject<any>) => {
  if (color === 'white') {
    type = 'empty'
  }
  
  return (
    <button ref={ref} onClick={onClick} className={concatStyles(styles['container'], styles[color], styles[type])}>{children}</button>
  );
});

export default Button;