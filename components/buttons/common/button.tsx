'use client';
import styles from './button.module.sass';

type ButtonProps = {
  children: string,
  color?: 'primary' | 'secondary' | 'tertiary' | 'quartenary' | 'error',
  type?: 'filled' | 'border',
  onClick: (e: React.MouseEvent<HTMLElement>) => void
}

export default function Button({children, color = 'primary', type = 'border', onClick} : ButtonProps) {
  return (
    <div onClick={onClick} className={styles.container + " " + styles[color] + " " + styles[type]}>
      <p className={styles.text + " " + styles[type] + " " + styles[color] }>
        {children}
      </p>
    </div>
  );
}
