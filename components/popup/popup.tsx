import { MutableRefObject, ReactNode, forwardRef, useEffect, useRef, useState } from 'react';
import ReactDOM from "react-dom";
import styles from './popup.module.sass';

export interface PositionOffset {
  x: number;
  y: number
}

type PopUpProps = {
  children: ReactNode,
  offset?: PositionOffset
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
}

const PopUp = forwardRef(({children, offset = {x: 0, y: 0}, onClose}: PopUpProps, ref: MutableRefObject<any>) => {
  const thisref = useRef(null)

  var x = 0;
  var y = 0;

  if(ref && ref.current) {
    var rect = ref.current.getBoundingClientRect(); 
    x = rect.x + rect.width / 2 + offset.x;
    y = rect.y + rect.height / 2 + offset.y;
  }

  useEffect(() => {
    document.addEventListener("click", handleCloseClick, false);

    return () =>{
      document.removeEventListener("click", handleCloseClick, false);
    }
    
  },[])

  const handleCloseClick = (e) => {
    e.preventDefault();
    const values = thisref.current.getBoundingClientRect();

    const x1 = values.x
    const x2 = values.x + values.width
    const y1 = values.y
    const y2 = values.y + values.height
    const mousex = e.clientX
    const mousey = e.clientY
    
    if((mousex >= x1 && mousex <= x2) && (mousey >= y1 && mousey <= y2)){
      return;
    }
    onClose(e);
  };


  const content = (
    <div 
      className={styles["popup-wrapper"]}
      style={{top: y, left: x}}
      ref={thisref}
    >
      {children}
    </div>
  )

  return ReactDOM.createPortal(
    content,
    document.getElementById("popup-root")
  );
})

export default PopUp;