import { MutableRefObject } from "react";
import { DragItemProps, Position } from "./item/dragitem";

export function convertToMatrix<T>(
  list: Array<T>,
  count: number
): Array<Array<DragItemProps>> {
  var matrix = [],
    i = 0,
    aux = 0,
    arr;

  while (true) {
    arr = list.slice(aux, aux + count);

    if (arr.length === 0) {
      break;
    }

    while(arr.length !== count){
      arr.push(<span></span>)

    }

    matrix[i] = arr.map((item, index) => {
      return { children: item, row: i, column: index };
    });
    aux += count;
    i++;
  }

  return matrix;
}

export function calculateInitialPosition(
  itemRef: MutableRefObject<any>, 
  parentRef: MutableRefObject<any>): Position {
    const itemBoundary = itemRef.current.getBoundingClientRect();
    const parentBoundary = parentRef.current.getBoundingClientRect();

    const position = {
      left: itemBoundary.x - parentBoundary.x + itemBoundary.width / 2,
      top: itemBoundary.y - parentBoundary.y  + itemBoundary.height / 2,
    };

    return fixBoundary(position, {width: itemBoundary.width, height: itemBoundary.height} ,{width: parentBoundary.width, height: parentBoundary.height}) 
}

export function calculatePosition(
  e: React.MouseEvent<HTMLDivElement>  | MouseEvent,
  itemRef: MutableRefObject<any>, 
  parentRef: MutableRefObject<any>): Position  {
    
  const mousePosition = {
    x: e.clientX,
    y: e.clientY,
  };

  const itemBoundary = itemRef.current.getBoundingClientRect();
  const parentBoundary = parentRef.current.getBoundingClientRect();

  const position = {
    left: mousePosition.x - parentBoundary.left - itemBoundary.width - 2,
    top: mousePosition.y - parentBoundary.top - itemBoundary.height - 2
  };

  return fixBoundary(position, {width: itemBoundary.width, height: itemBoundary.height} ,{width: parentBoundary.width, height: parentBoundary.height}) 
}

function fixBoundary(position: Position, item: {width: number, height: number}, parent: {width: number, height: number}){
  const fixedPosition = position;
  // if(position.left < 0) {
  //   fixedPosition.left = 0;  
  // }

  // if(position.top < 0) {
  //   fixedPosition.top = 0;  
  // }

  // if(position.left > parent.width - item.width){
  //   fixedPosition.left = parent.width - item.width;
  // }

  // if(position.top > parent.height - item.height){
  //   fixedPosition.top = parent.height - item.height;
  // }

  return fixedPosition;
}