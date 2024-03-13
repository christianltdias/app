import styles from "./dropdown.gooey.module.sass";

type DropdownItem = {
  title: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

type DropdownProps = {
  children: string;
  items: DropdownItem[];
  type?: 'default' | 'dark'
};

export default function GooeyDropdown({ children, items, type = 'default' }: DropdownProps) {
  return (
    <>
      <div className={[styles["dropdown"], styles[type]].join(' ')}>
        <input type="checkbox" id="dropdown" />

        <label className={[styles["dropdown__face"], styles[type]].join(' ')} htmlFor="dropdown">
          <div className={styles["dropdown__text"]}>{children}</div>

          <div className={styles["dropdown__arrow"]}></div>
        </label>

        <ul className={[styles["dropdown__items"], styles[type]].join(' ')}>
          {items.map((item, index) => <li key={`drop-item-${index}`} onClick={item.onClick}>{item.title}</li>)}
        </ul>
      </div>

      <svg className={styles["dropdown_svg"]}>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>
    </>
  );
}
