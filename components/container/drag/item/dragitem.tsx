import {
  MutableRefObject,
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./dragitem.module.sass";
import { concatStyles } from "../../../../utils/styles.utils";
import { calculatePosition } from "../drag.utils";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../../../states/hooks";
import {
  applyMovement,
  pinItem,
  setActiveItem,
} from "../../../../states/slices/components/drag/drag.slice";

export type DragItemProps = {
  children: ReactNode;
  row: number;
  column: number;
  pinned?: boolean;
};

export type Position = {
  left: number;
  top: number;
};

const DragItem = forwardRef(
  (
    { children, row, column, pinned = false }: DragItemProps,
    parentRef: MutableRefObject<any>
  ) => {
    const itemRef = useRef(null);
    const dispatch = useAppDispatch();
    const activeItem = useAppSelector((state) => state.drag.activeItem);
    const dragging = useAppSelector((state) => state.drag.dragging);

    const [position, setPosition] = useState<Position | null>(null);
    const [hovered, setHovered] = useState<boolean>(false);

    const handleMove = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
      if (
        !pinned &&
        calculateDistance(
          e,
          calculatePosition(e.currentTarget.clickedPosition, itemRef, parentRef)
        ) >= 1000
      ) {
        dispatch(setActiveItem({ row, column }));
      }

      setPosition(calculatePosition(e, itemRef, parentRef));
    };

    const handleEnd = () => {
      dispatch(applyMovement());
      setPosition(null);
      window.getSelection().removeAllRanges();
    };

    const calculateDistance = (
      e: React.MouseEvent<HTMLDivElement> | MouseEvent,
      init: { left: number; top: number }
    ) => {
      const newpos = calculatePosition(e, itemRef, parentRef);
      const deltax = Math.pow(newpos.left - init.left, 2);
      const deltay = Math.pow(newpos.top - init.top, 2);

      return deltax + deltay;
    };

    const mousedown = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
      if (pinned) {
        return;
      }

      document.clickedPosition = e;
      document.addEventListener("mousemove", handleMove, true);
      document.addEventListener(
        "mouseup",
        function () {
          document.removeEventListener("mousemove", handleMove, true);
          handleEnd();
        },
        { once: true }
      );
    };

    const isMoving = () => {
      return (
        !pinned &&
        dragging &&
        activeItem &&
        activeItem.row === row &&
        activeItem.column === column
      );
    };

    return (
      <>
        <div
          className={styles.container}
          style={{ userSelect: dragging ? "none" : "auto" }}
          onDoubleClick={() => {
            if(children){
              dispatch(pinItem({ row, column }))
            }
          }}
          ref={itemRef}
          onMouseEnter={() => setHovered(true) }
          onMouseLeave={() => setHovered(false) }
        >
          {children}
          {children && pinned && (
            <Image
              className={styles.pinned}
              src="/pin.svg"
              alt="Pin"
              width={24}
              height={24}
            />
          )}
          {children && !pinned && hovered && (
            <Image
              className={styles.move}
              src="/grip-dots.svg"
              alt="Move"
              width={24}
              height={24}
              draggable={false}
              onMouseDown={mousedown}
            />
          )}
        </div>
        {isMoving() && (
          <div
            className={concatStyles(styles.container, styles.dragging)}
            style={{ top: position.top, left: position.left }}
          >
            {children}
          </div>
        )}
      </>
    );
  }
);

export default DragItem;
