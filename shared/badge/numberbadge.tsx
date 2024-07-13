
import { ReactNode } from "react";
import styles from "./badge.module.sass";
import { concatStyles } from "../../utils/styles.utils";

export type BadgeColors = 'info' | 'success' | 'warning' | 'danger' | 'default'

type NumberBadgeProps = {
  number: string | ReactNode;
  onClick?: () => void; 
  includeOperator?: boolean; 
  color?: BadgeColors;
};

export default function NumberBadge({ number, onClick, includeOperator=true, color='default' }: NumberBadgeProps) {
  return (
    <div className={concatStyles(styles["numberbadge-container"], styles[color], onClick ? styles['clickable'] : '')} onClick={onClick}>
      <span className={styles["badge"]}>{includeOperator ? '+' : ''}{number}</span>
    </div>
  );
}
