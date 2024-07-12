import { ReactNode } from "react";
import Image from "next/image";
import styles from "./badge.module.sass";
import { concatStyles } from "../../utils/styles.utils";

export type BadgeColors = 'info' | 'success' | 'warning' | 'danger' | 'default'

type BadgeProps = {
  children: string | ReactNode;
  color?: BadgeColors; 
  onDelete?: () => void;
};

export default function Badge({ children, onDelete, color='default' }: BadgeProps) {
  return (
    <div className={concatStyles(styles["badge-container"], styles[color])}>
      <span className={styles["badge"]}>{children}</span>
      {onDelete && (
        <span className={styles["badge-icon"]}>
          <Image
            src="/close-filled.svg"
            onClick={onDelete}
            alt="home"
            width={16}
            height={16}
          />
        </span>
      )}
    </div>
  );
}
