import { ReactNode } from 'react';
import styles from './card.module.sass';

type Props = {
  children?: ReactNode,
  title: string,
  color?: string
}

function onClickBla(){
  console.log("bla bla")
}

export default function Card({children, title}: Props) {
  return (
    <div className={styles.container}>
      {children}
      <button onClick={() => onClickBla()}>Something</button>
    </div>
  );
}
