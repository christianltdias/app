import { useId } from "react";
import styles from "./checkbox.module.sass";
import { InputColors } from "../../../../types/input.types";

type CheckBoxProps = {
  children: string;
  value: boolean;
  onChange: (e: boolean) => void;
  color?: InputColors;
  disabled?: boolean;
  colored?: boolean;
};

export default function CheckBox({
  children,
  value,
  onChange,
  color = "default",
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
    <div className={styles["container"]}>
      <input
        className={styles[color]}
        id={id}
        type="checkbox"
        disabled={disabled}
        checked={value}
        onChange={handleCheck}
      />

      <label htmlFor={id} className={colored ? styles["colored"] : ''}>{children}</label>
    </div>
  );
}
