import Image from "next/image";
import styles from "./datepicker.module.sass";
import { useRef, useState } from "react";
import { isDateValid, maskDate } from "./date.utils";
import { concatStyles } from "../../../utils/styles.utils";

type DatePickerProps = {
  dateFormat?: "dd/mm/yyyy";
};

export default function DatePicker({
  dateFormat = "dd/mm/yyyy",
}: DatePickerProps) {
  const [dateStr, setDateStr] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = maskDate(e.target.value)
    setDateStr(value)
  };

  return (
    <div
      className={concatStyles(
        styles["container"],
        isInvalid ? styles["invalid"] : ""
      )}
    >
      <div className={styles["container-img"]}>
        <Image src="/calendar.svg" alt="Pin" width={16} height={16} />
      </div>
      <input
        type="text"
        className={styles["date-input"]}
        value={dateStr}
        placeholder="Date"
        onChange={onValueChange}
        onFocus={()=> setIsInvalid(false)}
        onBlur={() => {
          var parts = dateStr.split('/');
          if (parts.length !== 3 || !isDateValid(`${parts[0]}/${parts[1]}/${parts[2]}`)) {
            setIsInvalid(true);
          }
        }}
      />
    </div>
  );
}
