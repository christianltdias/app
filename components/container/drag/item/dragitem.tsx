import { MutableRefObject, ReactNode, forwardRef, useEffect, useRef, useState } from "react";
import styles from "./dragitem.module.sass";
import { concatStyles } from "../../../../utils/styles.utils";
import { calculateInitialPosition, calculatePosition } from "../drag.utils";
import { useAppDispatch, useAppSelector } from "../../../../states/hooks";
import { applyMovement, setActiveItem } from "../../../../states/slices/components/drag/drag.slice";

export type DragItemProps = {
  children: ReactNode;
  row: number;
  column: number;
};

export type Position = {
  left: number;
  top: number;
};

const DragItem = forwardRef(({
  children,
  row,
  column
}: DragItemProps, parentRef: MutableRefObject<any>) => {
  const itemRef = useRef(null);
  
  useEffect(() => {
    const initialPos = calculateInitialPosition(itemRef, parentRef)
    setInitialPosition(initialPos);
    setPosition(initialPos);
  }, [itemRef.current, parentRef.current]);

  
  const dispatch = useAppDispatch();
  const activeItem = useAppSelector(state => state.drag.activeItem)
  
  const [position, setPosition] = useState<Position>({left: 0, top: 0});
  const [initialPosition, setInitialPosition] = useState<Position>({left: 0, top: 0});

  const handleMove = (e: React.MouseEvent<HTMLDivElement>  | MouseEvent) => {
    setPosition(calculatePosition(e, itemRef, parentRef));
  };

  const handleEnd = () => {
    dispatch(applyMovement())
    setPosition(initialPosition)
  };

  const mousedown = () => {
    dispatch(setActiveItem({row, column}))

    document.addEventListener('mousemove', handleMove, true);

    document.addEventListener('mouseup', function () {
      document.removeEventListener('mousemove', handleMove, true);
      handleEnd();
    }, {once: true});
  }

  return (
    <>
      <div
        className={styles.container}
        onMouseDown={mousedown}
        ref={itemRef}
      >
        {children}
      </div>
      {(activeItem && activeItem.row === row && activeItem.column === column) && 
        <div
          className={concatStyles(styles.container, styles.dragging)}
          style={{ top: position.top, left: position.left }}
          onMouseDown={mousedown}
        >
          {children}
        </div>
      }
    </>
  );
})

export default DragItem;