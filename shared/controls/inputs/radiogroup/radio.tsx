import { useId } from "react";
import styles from "./radio.module.sass";
import { InputColors } from "../../../../types/input.types";

export type RadioButtonProps = {
  children: string;
  value: boolean;
  onChange: (e: boolean) => void,
  color?: InputColors;
  disabled?: boolean;
  colored?: boolean;
};

export default function RadioButton({
  children,
  value,
  onChange,
  color = "default",
  disabled = false,
  colored = true,
}: RadioButtonProps) {
  const id = useId();

  return (
    <div className={styles["container"]}>
      <input
        className={styles[color]}
        id={id}
        type="checkbox"
        disabled={disabled}
        checked={value}
        onChange={() => onChange(!value)}
      />

      <label htmlFor={id} className={colored ? styles["colored"] : ''}>{children}</label>
    </div>
  );
}
