import styles from "./badge.module.sass";
import { concatStyles } from "../../utils/styles.utils";
import { CommonColors } from "../../types/global.types";

type NumberBadgeProps = {
  children: number;
  onClick?: () => void; 
  color?: CommonColors;
};

export default function NumberBadge({ children, onClick, color='gray' }: NumberBadgeProps) {
  const isAboveLimit = children > 99
  const number = isAboveLimit ? 99 : children
  return (
    <div className={concatStyles(styles["numberbadge-container"], styles[color], onClick ? styles['clickable'] : '')} onClick={onClick}>
      <span className={styles["badge"]}>{isAboveLimit ? '+' : ''}{number}</span>
    </div>
  );
}
