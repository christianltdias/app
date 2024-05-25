import { concatStyles } from "../../../../utils/styles.utils";
import styles from "./checkbox.module.sass";

type CheckBoxProps = {
  children: string;
  color?: 'default' | 'light-blue' | 'green' | 'yellow'
};

export default function CheckBox({children, color='default'}: CheckBoxProps) {

  return (
    <div className={styles['container']}>
      <input id={`cb-${children}`} type="checkbox" className={concatStyles(styles[color])} />
      <label htmlFor={`cb-${children}`}>{children}</label>
    </div>
  );
}
