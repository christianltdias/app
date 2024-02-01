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
  let timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, 0);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <>
      <div
        className={styles["Tooltip-Wrapper"]}
        onMouseEnter={showTip}
        onMouseLeave={hideTip}
      >
        {children}
        {active && (
          <div
          className={concatStyles(styles["Tooltip-Tip"], styles[direction])}
          >
            {text}
          </div>
        )}
      </div>
    </>
  );
}
