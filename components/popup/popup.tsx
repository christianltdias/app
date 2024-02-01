import { MutableRefObject, ReactNode, forwardRef, useEffect, useRef, useState } from 'react';
import ReactDOM from "react-dom";
import styles from './popup.module.sass';

interface PositionOffset {
  x: number;
  y: number
}

type PopUpProps = {
  children: ReactNode,
  offset?: PositionOffset
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
}

const popUp = forwardRef(({children, offset = {x: 0, y: 0}, onClose}: PopUpProps, ref: MutableRefObject<any>) => {
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
    if (!thisref.current.contains(e.target)) onClose(e);
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

export default popUp;