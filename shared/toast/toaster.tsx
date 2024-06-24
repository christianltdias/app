import React from "react";
import ReactDOM from "react-dom";
import { useAppSelector } from "../../store/store";
import Toast from "./toast";
import styles from "./toast.module.sass";

type ToasterProps = {
  position: "top-right" | "top-left" | "bottom-right" | "bottom-left";
};

const Toaster = ({ position = "bottom-right" }: ToasterProps) => {
  const toasts = useAppSelector((state) => state.toaster.items);

  const getStyles = (): {} => {
    const styles = {}
    if (position.includes("bottom")) {
      styles['flexDirection'] = "column-reverse"
      styles['bottom'] = '20px' 
    } else {
      styles['flexDirection'] = "column"
      styles['top'] = '70px' 
    }

    if (position.includes("right")) {
      styles["right"] = 0;
      styles["alignItems"] = 'flex-end';
    } else {
      styles["left"] = 0;
      styles["alignItems"] = 'flex-start';
    }

    return styles;
  };

  const timerToasts = toasts.filter(t => !t.sticky)
  const stickyToasts = toasts.filter(t => t.sticky)

  const toastContent = (
    <div
      className={styles["container"]}
      style={getStyles()}
    >
      {[...timerToasts, ...stickyToasts].map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          title={toast.title}
          sticky={toast.sticky}
          type={toast.type}
        >
          {toast.children}
        </Toast>
      ))}
    </div>
  );

  if (toasts.length === 0) {
    return;
  }

  return ReactDOM.createPortal(
    toastContent,
    document.getElementById("toaster-root")
  );
};

export default Toaster;
