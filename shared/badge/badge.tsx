import { ReactNode } from "react";
import Image from "next/image";
import { concatStyles } from "../../utils/styles.utils";
import styles from "./badge.module.sass";
import { CommonColors } from "../../types/global.types";

type BadgeProps = {
  children: string | ReactNode;
  color?: CommonColors; 
  onDelete?: () => void;
};

export default function Badge({ children, onDelete, color='gray' }: BadgeProps) {
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
