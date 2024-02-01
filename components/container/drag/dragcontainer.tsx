import { ReactNode, useEffect, useRef } from "react";
import DragItem from "./item/dragitem";
import styles from "./dragcontainer.module.sass";
import { concatStyles } from "../../../utils/styles.utils";
import { useAppDispatch, useAppSelector } from "../../../states/hooks";
import { setActiveCell, setItems } from "../../../states/slices/components/drag/drag.slice";

type DragContainerProps = {
  items: ReactNode[];
  count?: number;
};

export default function DragContainer({ items, count }: DragContainerProps) {
  const matrixRef = useRef(null);
  
  const dispatch = useAppDispatch();
  const hoveredCell = useAppSelector(state => state.drag.activeCell)
  const dragging = useAppSelector(state => state.drag.dragging)

  var containeritems =  useAppSelector(state => state.drag.items)
  
  useEffect(() => {
    dispatch(setItems({items, count}))
  }, [items, count])

  const handleCellHover = (row: number, column: number) => {
    if(dragging && (hoveredCell.row !== row || hoveredCell.column !== column)) {
      dispatch(setActiveCell({row, column}))
    }
  }

  return (
    <div className={styles.container} ref={matrixRef}>
      {containeritems.map((row, i) => {
        return (
          <div className={styles["container-row"]} key={`drag-row-${i}`}>
            {row.map((column, j) => {
              return (
                <div
                  className={concatStyles(
                    styles["container-column"],
                    hoveredCell && (hoveredCell.row ===  i && hoveredCell.column === j) ? styles['hovered'] : '')}
                  key={`drag-row-${i}-col-${j}`}
                  onMouseMove={() => handleCellHover(i, j)}
                >
                  <DragItem
                    row={i}
                    column={j}
                    ref={matrixRef}
                  >
                    {column.children}
                  </DragItem>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
