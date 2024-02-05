import Image from "next/image";
import { LegacyRef, useRef, useState } from "react";
import { BoundaryReference } from "../../../types/references";
import { isDateValid, maskDate } from "../../../utils/date.utils";
import { concatStyles } from "../../../utils/styles.utils";
import PopUp, { PositionOffset } from "../../popup/popup";
import Calendar from "../calendar/calendar";
import styles from "./datepicker.module.sass";

type DatePickerProps = {
  dateFormat?: "dd/mm/yyyy";
  isDateRange?: boolean;
  allowPastSelect?: boolean;
};

export default function DatePicker({
  dateFormat = "dd/mm/yyyy",
  isDateRange = false,
  allowPastSelect = true,
}: DatePickerProps) {
  const thisRef = useRef<BoundaryReference<any>>(null);

  const [initialDateStr, setInitialDateStr] = useState("");
  const [finalDateStr, setFinalDateStr] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [initialDate, setInitialDate] = useState<Date>(null);
  const [finalDate, setFinalDate] = useState<Date>(null);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = maskDate(
      initialDateStr,
      e.target.value.replace(/[^0-9|\/]/gi, "")
    );
    var formatted = formatDate(
      value.slice(0, 2),
      value.slice(2, 4),
      value.slice(4, 8)
    );

    setInitialDateStr(formatted);
  };

  const getPopUpPosition = (): PositionOffset => {
    if (thisRef.current) {
      const rect = thisRef.current.getBoundingClientRect();
      return { x: -rect.width / 2, y: rect.height / 2 + 10 };
    }
    return { x: 0, y: 0 };
  };

  const formatDate = (day: string, month: string, year: string): string => {
    const dayF = day && day.length === 1 ? `0${day}` : day
    const monthF = month && month.length === 1 ? `0${month}` : month

    return dateFormat
      .replace("dd", dayF)
      .replace("mm", monthF)
      .replace("yyyy", year)
      .split("/")
      .filter((part) => part !== "")
      .join("/");
  };

  const handleInitialDateSelection = (date: Date) => {
    if (!date) {
      setInitialDateStr("");
    } else {
      setInitialDateStr(
        formatDate(
          date.getDate().toString(),
          (date.getMonth() + 1).toString(),
          date.getFullYear().toString()
        )
      );
    }
    setInitialDate(date);
  };

  const handleFinalDateSelection = (date: Date) => {
    if (!date) {
      setFinalDateStr("");
    } else {
      setFinalDateStr(
        formatDate(
          date.getDate().toString(),
          (date.getMonth() + 1).toString(),
          date.getFullYear().toString()
        )
      );
    }
    setFinalDate(date);
  };

  return (
    <div
      ref={thisRef as LegacyRef<HTMLDivElement>}
      className={concatStyles(
        styles["container"],
        isInvalid ? styles["invalid"] : ""
      )}
    >
      <div
        className={styles["container-img"]}
        onClick={() => setIsModal(!isModal)}
      >
        <Image src="/calendar.svg" alt="Pin" width={16} height={16} />
      </div>
      {isDateRange && (
        <span
          className={styles["date-range-picker"]}
          onClick={() => setIsModal(!isModal)}
        >{`${initialDateStr} - ${finalDateStr}`}</span>
      )}
      {!isDateRange && (
        <input
          type="text"
          className={styles["date-input"]}
          value={initialDateStr}
          placeholder="Date"
          onChange={onValueChange}
          onFocus={() => setIsInvalid(false)}
          onBlur={() => {
            var parts = initialDateStr.split("/");
            if (parts.length !== 3 || parts[2].length !== 4) {
              setInitialDateStr("");
            } else if (!isDateValid(`${parts[0]}/${parts[1]}/${parts[2]}`)) {
              setIsInvalid(true);
            }
          }}
        />
      )}

      {isModal && (
        <PopUp
          onClose={() => setIsModal(false)}
          ref={thisRef}
          offset={getPopUpPosition()}
        >
          <div className={styles["date-picker-container"]}>
            <div className={styles["date-picker"]}>
              <div className={styles["date-picker-calendar"]}>
                <Calendar
                  allowPastSelect={allowPastSelect}
                  allowMultipleSelect={isDateRange}
                  firstDate={initialDate}
                  setFirstDate={handleInitialDateSelection}
                  secondDate={finalDate}
                  setSecondDate={handleFinalDateSelection}
                />
              </div>
            </div>
          </div>
        </PopUp>
      )}
    </div>
  );
}
