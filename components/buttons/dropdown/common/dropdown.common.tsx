import { ReactNode } from "react";
import styles from "./dropdown.common.module.sass";

type DropdownItem = {
  title: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  items?: DropdownItem[];
};

type DropdownProps = {
  children: ReactNode;
  items?: DropdownItem[];
};

export default function Dropdown({ children, items = [] }: DropdownProps) {
  if(items.filter(i => i.items && i.items.length > 0).length > 1){
    throw new Error("Dropdown should not contain more than one item with sub items.")
  }

  const getDropdownItem = (item: DropdownItem): ReactNode => {
    if (item.items && item.items.length > 0) {
      return (
        <>
          <input
            className={styles["dropdown-sub"]}
            type="checkbox"
            id="dropdown-sub"
            name="dropdown-sub"
          />
          <label className={styles["for-dropdown-sub"]} htmlFor="dropdown-sub">
            {item.title} <i className={styles["uil uil-plus"]}></i>
          </label>
          {item.items && item.items.length > 0 &&
            <div className={styles["section-dropdown-sub"]}>
              {item.items.map(s => getDropdownItem(s))}
            </div>
          }
        </>
      );
    }
    return (
      <a href="#" onClick={item.onClick}>
        {item.title}
        <i className={styles["uil uil-arrow-right"]}></i>
      </a>
    );
  };

  return (
    <>
      <div className={styles["dropdown-wrapper"]}>
        <div className={styles["sec-center"]}>
          <input
            className={styles["dropdown"]}
            type="checkbox"
            id="dropdown"
            name="dropdown"
          />
          <label className={styles["for-dropdown"]} htmlFor="dropdown">
            {children} <i className={styles["uil uil-arrow-down"]}></i>
          </label>
          {items.length > 0 && (
            <div className={styles["section-dropdown"]}>
              {items.map((i) => getDropdownItem(i))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

{
  /* <div className={styles["section-dropdown"]}>
              <a href="#">
                Dropdown Link 1<i className={styles["uil uil-arrow-right"]}></i>
              </a>
              <input
                className={styles["dropdown-sub"]}
                type="checkbox"
                id="dropdown-sub"
                name="dropdown-sub"
              />
              <label
                className={styles["for-dropdown-sub"]}
                htmlFor="dropdown-sub"
              >
                Dropdown Sub <i className={styles["uil uil-plus"]}></i>
              </label>
              <div className={styles["section-dropdown-sub"]}>
                <a href="#">
                  Dropdown sub Link 1
                  <i className={styles["uil uil-arrow-right"]}></i>
                </a>
                <a href="#">
                  Dropdown sub Link 2
                  <i className={styles["uil uil-arrow-right"]}></i>
                </a>
              </div>
              <a href="#">
                Dropdown Link 2<i className={styles["uil uil-arrow-right"]}></i>
              </a>
              <a href="#">
                Dropdown Link 3<i className={styles["uil uil-arrow-right"]}></i>
              </a>
            </div> */
}
