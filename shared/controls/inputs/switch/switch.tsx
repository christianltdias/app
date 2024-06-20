import { useId } from "react";
import styles from "./switch.module.sass";

export type SwitchProps = {
  children: string;
  value: boolean;
  onChange: (e: boolean) => void;
  color?: "default" | "error" | "warning" | "green" | "purple";
  disabled?: boolean;
  colored?: boolean;
};

export default function Switch({
  children,
  value,
  onChange,
  color = "default",
  disabled = false,
  colored = false,
}: SwitchProps) {
  const id = useId();
  return (
    <div className={styles["container"]}>
      <input
        className={styles[color]}
        type="checkbox"
        disabled={disabled}
        checked={value}
        onChange={() => onChange(!value)}
      />
      <label htmlFor={id} className={colored ? styles["colored"] : ''}>{children}</label>
    </div>
  );
}
