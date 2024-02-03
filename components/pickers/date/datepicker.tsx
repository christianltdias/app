import Image from "next/image";
import styles from "./datepicker.module.sass";
import { LegacyRef, useRef, useState } from "react";
import { isDateValid, maskDate } from "../../../utils/date.utils";
import { concatStyles } from "../../../utils/styles.utils";
import PopUp, { PositionOffset } from "../../popup/popup"
import { BoundaryReference } from "../../../types/references";
import Button from "../../buttons/common/button";
import Calendar from "../calendar/calendar";

type DatePickerProps = {
  dateFormat?: "dd/mm/yyyy";
  isDateRange?: boolean 
};

export default function DatePicker({
  dateFormat = "dd/mm/yyyy",
  isDateRange = false
}: DatePickerProps) {
  const thisRef = useRef<BoundaryReference<any>>(null);

  const [dateStr, setDateStr] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = maskDate(e.target.value)
    setDateStr(value)
  };

  const getPopUpPosition = (): PositionOffset => {
    if(thisRef.current) {
      const rect = thisRef.current.getBoundingClientRect()
      return {x: - rect.width / 2, y: rect.height / 2 + 10}
    }
    return {x: 0, y: 0}
  }

  return (
    <div
      ref={thisRef as LegacyRef<HTMLDivElement>}
      className={concatStyles(
        styles["container"],
        isInvalid ? styles["invalid"] : ""
      )}
    >
      <div className={styles["container-img"]}  onClick={()=> setIsModal(!isModal)}>
        <Image src="/calendar.svg" alt="Pin" width={16} height={16}/>
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
          if (parts.length === 3 && !isDateValid(`${parts[0]}/${parts[1]}/${parts[2]}`)) {
            setIsInvalid(true);
          }
        }}
      />
      {isModal && (
        <PopUp onClose={()=> setIsModal(false)} ref={thisRef} offset={getPopUpPosition()}>
          <div className={styles['date-picker-container']}>
            <div className={styles['date-picker']}>
              <p>Start date:</p>
              <p>{dateStr}</p>
              <div className={styles['date-picker-calendar']}>
                <Calendar/>
              </div>
              <Button onClick={() => console.log('applying')}>Apply</Button>
            </div>
            <div className={styles['date-picker']}>
              <p>Start date:</p>
              <p>{dateStr}</p>
              <div className={styles['date-picker-calendar']}>

              </div>
              <Button onClick={() => console.log('applying')}>Apply</Button>
            </div>
          </div>
          </PopUp>
      )}
    </div>
  );
}
