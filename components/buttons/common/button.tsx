'use client';
import { MutableRefObject, forwardRef } from 'react';
import styles from './button.module.sass';

type ButtonProps = {
  children: string,
  color?: 'primary' | 'secondary' | 'tertiary' | 'quartenary' | 'error' | 'white',
  type?: 'filled' | 'border',
  onClick: (e: React.MouseEvent<HTMLElement>) => void,
}

const button = forwardRef(({children, color = 'primary', type = 'border', onClick} : ButtonProps, ref: MutableRefObject<any>) => {
  return (
    <div ref={ref} onClick={onClick} className={styles.container + " " + styles[color] + " " + styles[type]}>
      <p className={styles.text + " " + styles[type] + " " + styles[color] }>
        {children}
      </p>
    </div>
  );
});

export default button;