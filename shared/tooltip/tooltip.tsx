import { ReactNode, useState } from "react";
import styles from "./tooltip.module.sass";
import { concatStyles } from "../../utils/styles.utils";

type TooltipProps = {
  children: ReactNode;
  text: ReactNode;
  direction?: "top" | "right" | "bottom" | "left";
};

export default function Tooltip({
  children,
  text,
  direction = "top",
}: TooltipProps) {
  let timeout: NodeJS.Timeout;
  const [show, setShow] = useState<boolean>(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setShow(true);
    }, 500);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setShow(false);
  };

  return (
    <div onMouseEnter={showTip} onMouseLeave={hideTip} className={styles["tooltip-wrapper"]}>
      {children}
      {show && <div className={concatStyles(styles["tooltip"], styles[direction])}>{text}</div>}
    </div>
  );
}
