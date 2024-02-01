import { ReactNode, useEffect, useRef, useState } from "react";
import DragItem, { DragItemProps } from "./item/dragitem";
import styles from "./dragcontainer.module.sass";
import { concatStyles } from "../../../utils/styles.utils";
import { convertToMatrix } from "./drag.utils";

type DragContainerProps = {
  items: ReactNode[];
  count?: number;
};

export default function DragContainer({ items, count }: DragContainerProps) {
  const matrixRef = useRef(null);
  const maxcount = count ? count : items.length;
  const matrix = convertToMatrix<ReactNode>(items, maxcount);
  
  const [containeritems, setItems] = useState<Array<Array<DragItemProps>>>(matrix);
  const [draggingItem, setDraggingItem] = useState("");
  const [hoveredCell, setHoveredCell] = useState("");

  const handleCellHover = (row: number, column: number) => {
    if(draggingItem !== '' && (hoveredCell !== `${row}-${column}`)) {
      setHoveredCell(`${row}-${column}`)
      sessionStorage.setItem("hoverkey", `${row}-${column}`);
    }
  }

  const handleButtonDown = (row: number, column: number) => {
    var value = sessionStorage.getItem("hoverkey")
    if(value !== `${row}-${column}`) {
      const indexes = value.split('-');
      if(indexes.length === 2){
        const temp = containeritems[indexes[0]][indexes[1]]
        containeritems[indexes[0]][indexes[1]] = containeritems[row][column]
        containeritems[row][column] = temp
        setItems(containeritems)
        setHoveredCell('');
      }
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
                  className={concatStyles(styles["container-column"], hoveredCell === `${i}-${j}` ? styles['hovered'] : '')}
                  key={`drag-row-${i}-col-${j}`}
                  onMouseMove={() => handleCellHover(i, j)}
                >
                  <DragItem
                    row={i}
                    column={j}
                    setItemId={setDraggingItem}
                    onApply={handleButtonDown}
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
