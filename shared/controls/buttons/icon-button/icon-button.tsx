import Image from "next/image";
import styles from "./icon-button.module.sass";

type IconButtonProps = {
  onClick: () => void;
  size?: number;
};

export default function IconButton({ onClick, size = 18 }: IconButtonProps) {
  return (
    <div className={styles["container"]}>
      <Image
        src={`/error.svg`}
        alt="Notifications"
        width={size}
        height={size}
        onClick={onClick}
      />
    </div>
  );
}
