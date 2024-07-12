import { ReactNode } from "react";
import Image from "next/image";
import styles from "./badge.module.sass";

type BadgeProps = {
  children: string | ReactNode;
  onDelete?: () => void;
};

export default function Badge({ children, onDelete }: BadgeProps) {
  return (
    <div className={styles["badge-container"]}>
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
