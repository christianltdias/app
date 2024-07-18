'use client';
import { MutableRefObject, forwardRef } from 'react';
import { concatStyles } from '../../../../utils/styles.utils';
import styles from './button.module.sass';
import { ButtonColors } from '../../../../types/global.types';

export type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'cancel' | 'white';
export type ButtonType = 'filled' | 'border' | 'empty';

type ButtonProps = {
  children: string,
  onClick: (e: React.MouseEvent<HTMLElement>) => void,
  color?: ButtonColors,
  type?: ButtonType,
}

const Button = forwardRef(({children, color = 'info', type = 'border', onClick} : ButtonProps, ref: MutableRefObject<any>) => {
  if (color === 'white') {
    type = 'empty'
  }
  
  return (
    <button ref={ref} onClick={onClick} className={concatStyles(styles['container'], styles[color], styles[type])}>{children}</button>
  );
});

export default Button;