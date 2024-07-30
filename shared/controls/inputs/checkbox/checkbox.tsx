import { useId } from "react";
import styles from "./checkbox.module.sass";
import { CommonColors } from "../../../../types/global.types";

type CheckBoxProps = {
  value: boolean;
  onChange: (e: boolean) => void;
  children?: string;
  color?: CommonColors;
  disabled?: boolean;
  colored?: boolean;
};

export default function CheckBox({
  children,
  value,
  onChange,
  color = "info",
  disabled = false,
  colored = false,
}: CheckBoxProps) {
  const id = useId();

  const handleCheck = () => {
    if(!disabled){
      onChange(!value)
    }
  }

  return (
    <div className={styles["checkbox-container"]}>
      <input
        className={styles[color]}
        id={id}
        type="checkbox"
        disabled={disabled}
        checked={value}
        onChange={handleCheck}
      />
      {children && <label htmlFor={id} className={colored ? styles["colored"] : ''}>{children}</label>}
    </div>
  );
}
