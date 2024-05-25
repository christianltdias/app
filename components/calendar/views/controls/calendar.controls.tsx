import { useAppDispatch, useAppSelector } from "../../../../states/hooks";
import {
  setFactor,
  setSelectedDate,
  setView,
} from "../../../../states/slices/components/calendar/calendar.slice";
import { CalendarView } from "../../../../types/calendar.types";
import { getEnumByIndex } from "../../../../utils/enum.utils";
import Dropdown, { DropdownColors } from "../../../controls/buttons/dropdown/common/dropdown.common";
import * as Unicons from '@iconscout/react-unicons';
import styles from "./calendar.controls.module.sass";
import { concatStyles } from "../../../../utils/styles.utils";

type CalendarControlsProps = {
  selectFactor?: boolean;
  selectView?: boolean;
  color?: DropdownColors;
  dateText?: string;
  applyPrevious?: (e: React.MouseEvent<HTMLElement>) => void;
  applyNext?: (e: React.MouseEvent<HTMLElement>) => void;
};

export default function CalendarControls({
  selectFactor = true,
  selectView = true,
  color = 'white',
  dateText,
  applyPrevious,
  applyNext, 
}: CalendarControlsProps) {
  const dispatch = useAppDispatch();
  const factor = useAppSelector((state) => state.calendar.factor);
  const view = useAppSelector((state) => state.calendar.view);

  return (
    <div className={styles["calendar-day-header-controls"]}>
      <Unicons.UilAngleDoubleLeft className={concatStyles(styles["icon"], styles[color])} onClick={()=> dispatch(setSelectedDate({isNext: false}))} />
      <span>{dateText}</span>
      <Unicons.UilAngleDoubleRight className={concatStyles(styles["icon"], styles[color])}  onClick={()=> dispatch(setSelectedDate({isNext: true}))}  />

      {selectFactor && (
        <Dropdown
          color={color}
          items={[
            {
              title: "1",
              onClick: () => dispatch(setFactor({ factor: 1 })),
            },
            {
              title: "2",
              onClick: () => dispatch(setFactor({ factor: 2 })),
            },
          ]}
          placeholder={`Factor: ${factor}`}
        />
      )}
      {selectView && (
        <Dropdown
          isSelection
          color={color}
          items={[
            {
              title:
                CalendarView[
                  getEnumByIndex<string>(CalendarView, CalendarView.Day)
                ],
              onClick: () => dispatch(setView({ view: CalendarView.Day })),
            },
            {
              title:
                CalendarView[
                  getEnumByIndex<string>(CalendarView, CalendarView.Week)
                ],
              onClick: () => dispatch(setView({ view: CalendarView.Week })),
            },
            {
              title:
                CalendarView[
                  getEnumByIndex<string>(CalendarView, CalendarView.Month)
                ],
              onClick: () => dispatch(setView({ view: CalendarView.Month })),
            },
          ]}
          placeholder={CalendarView[getEnumByIndex<string>(CalendarView, view)]}
        />
      )}
    </div>
  );
}
