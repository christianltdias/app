import { useAppDispatch, useAppSelector } from "../../../../states/hooks";
import {
  setFactor,
  setView,
} from "../../../../states/slices/components/calendar/calendar.slice";
import { CalendarView } from "../../../../types/calendar.types";
import { getEnumByIndex } from "../../../../utils/enum.utils";
import Dropdown, { DropdownColors } from "../../../buttons/dropdown/common/dropdown.common";
import styles from "./calendar.controls.module.sass";

type CalendarControlsProps = {
  selectFactor?: boolean;
  selectView?: boolean;
  color?: DropdownColors;
};

export default function CalendarControls({
  selectFactor = true,
  selectView = true,
  color = 'white', 
}: CalendarControlsProps) {
  const dispatch = useAppDispatch();
  const factor = useAppSelector((state) => state.calendar.factor);
  const view = useAppSelector((state) => state.calendar.view);

  return (
    <div className={styles["calendar-day-header-controls"]}>
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
