import { Dispatch, MutableRefObject, ReactNode, SetStateAction, forwardRef, useEffect, useRef, useState } from "react";
import styles from "./dragitem.module.sass";
import { concatStyles } from "../../../../utils/styles.utils";
import { calculateInitialPosition, calculatePosition } from "../drag.utils";

export type DragItemProps = {
  children: ReactNode;
  row: number;
  column: number;
  setItemId: Dispatch<SetStateAction<string>>;
  onApply: (row: number, column: number) => void;
};

export type Position = {
  left: number;
  top: number;
};

const DragItem = forwardRef(({
  children,
  row,
  column,
  setItemId,
  onApply
}: DragItemProps, parentRef: MutableRefObject<any>) => {
  const itemRef = useRef(null);

  
  useEffect(() => {
    const initialPos = calculateInitialPosition(itemRef, parentRef)
    setInitialPosition(initialPos);
    setPosition(initialPos);
  }, [itemRef.current, parentRef.current]);
  
  const [dragging, setDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({left: 0, top: 0});
  const [initialPosition, setInitialPosition] = useState<Position>({left: 0, top: 0});

  const handleMove = (e: React.MouseEvent<HTMLDivElement>  | MouseEvent) => {
    if(!dragging){
      setDragging(true)
    }
    setPosition(calculatePosition(e, itemRef, parentRef));
  };

  const handleEnd = () => {
    setItemId("");
    onApply(row, column)
    setDragging(false)
    setPosition(initialPosition)
  };

  const mousedown = () => {
    setItemId(`${row}-${column}`)

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
      {dragging && 
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