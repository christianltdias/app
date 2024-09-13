import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { CommonColors } from "../../../../types/global.types";
import { concatStyles } from "../../../../utils/styles.utils";
import styles from "./input.module.sass";
import { Validator } from "../../../../utils/validators.utils";
import Image from "next/image";
import Tooltip from "../../../tooltip/tooltip";

type InputProps = {
  label: string;
  value: string;
  onChange: (text: string) => void;
  color?: CommonColors;
  type?: "text" | "password";
  width?: string;
  validators?: Validator[];
  autoValidate?: boolean;
};

const Input = forwardRef(
  (
    {
      label,
      type = "text",
      color = "info",
      value,
      onChange,
      width,
      validators = [],
      autoValidate = false
    }: InputProps,
    ref
  ) => {
    var onValueChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      e.preventDefault();
      onChange(e.target.value);
    };
    const [error, setError] = useState(null);
    const style = width ? { width } : {};
    const errorClass = error ? styles["error"] : "";

    useImperativeHandle(ref, () => ({
      validate() {
        handleValidation(true)
      },
    }));

    const handleValidation = useCallback((shouldValidate: boolean) => {
      if(shouldValidate){
        for (const validator of validators) {
          const errorMessage = validator(value);
          if (errorMessage) {
            setError(errorMessage);
            return false;
          }
        }
        setError(null);
      }
      return true;
    }, [value])

    return (
      <div className={styles["input_container"]} style={style}>
        <label className={styles["input"]}>
          <input
            className={concatStyles(
              styles["input_field"],
              errorClass,
              styles[color]
            )}
            type={type}
            placeholder=" "
            value={value}
            onChange={(e) => onValueChange(e)}
            onBlur={() => handleValidation(autoValidate)}
          />
          <span
            className={concatStyles(
              styles["input_label"],
              errorClass,
              styles[color]
            )}
          >
            {label}
            {(validators && validators.length) && <Tooltip text="dasd"><Image src="/info.svg" alt="info" width={12} height={12} className={styles['input_info']}/></Tooltip> }
          </span>
        </label>
        {error && <span className={styles["input_error"]}>{error}</span>}
      </div>
    );
  }
);

export default Input;
