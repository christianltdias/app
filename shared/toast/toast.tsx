import Image from "next/image";
import styles from "./toast.module.sass";
import { concatStyles } from "../../utils/styles.utils";
import IconButton from "../controls/buttons/icon-button/icon-button";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeToast } from "../../store/toast/toast.slice";

export type ToastProps = {
  title: string;
  children: string;
  id?: string;
  type?: "info" | "warning" | "error" | "success";
  sticky?: boolean;
  timeoutMs?: number;
};

export default function Toast({
  title,
  children,
  id = "",
  type = "info",
  sticky = false,
  timeoutMs = 3000,
}: ToastProps) {
  const [show, toggle] = useState<boolean>(true);
  const [display, setDisplay] = useState<'flex' | 'none'>('flex');
  const dispatch = useDispatch();

  const handleToastRemoval = () => {
    toggle(!show)

    setTimeout(() => {
      setDisplay('none')
      dispatch(removeToast(id))
    }, 250)
  }

  useEffect(()=>{
    if(!sticky){
      setTimeout(() => {
        handleToastRemoval()
      }, timeoutMs)
    }
  }, [])

  return (
    <div
      className={concatStyles(styles["toast-container"], styles[type], show ? '' : styles['gone'])}
      style={{ display: display}}
    >
      {sticky && (
        <div className={styles["sticky"]}>
          <IconButton onClick={handleToastRemoval} />
        </div>
      )}
      <Image
        src={`/${type}.svg`}
        alt="Notifications"
        width={22}
        height={22}
        className={styles["icon"]}
      />
      <div>
        <h3 className={styles["title"]}>{title}</h3>
        <p className={styles["content"]}>{children}</p>
      </div>
    </div>
  );
}
