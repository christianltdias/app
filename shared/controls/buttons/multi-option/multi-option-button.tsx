import styles from "./multi-option-button.module.sass";
import { concatStyles } from "../../../../utils/styles.utils";
import { UilAngleDown } from "@iconscout/react-unicons";
import { useRef, useState } from "react";

type ColorTypes = "primary" | "secondary" | "success" | "warning" | "cancel";

type Option = {
  title: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

type MultiOptionsButton = {
  color?: ColorTypes;
  options: Array<Option>;
};

export default function MultiOptionButton({
  options,
  color = "primary",
}: MultiOptionsButton) {
  if (!options || !options.length) {
    throw new Error(
      "You need to inform at least one option to use Multi option button."
    );
  }

  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Option>(options[0]);
  const mainRef = useRef(null)
  const menuRef = useRef(null)

  const menuItemRender = (item: Option) => {
    const handleClick = () => {
      setSelectedItem(item)
      setMenuOpen(false)
    }
    return (
      <div onClick={handleClick} className={concatStyles(styles['menu-item'], styles[color])}>
        {item.title}
      </div>
    )
  }

  return (
    <div>
      <div className={styles["container"]} ref={mainRef}>
        <div className={styles["control-container"]}>
          <div
            className={concatStyles(styles["button-wrapper"], styles[color])}
            onClick={selectedItem.onClick}
          >
            {selectedItem.title}
          </div>
          <div
            className={concatStyles(styles["menu"], styles[color])}
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            <UilAngleDown size="20" color="white" />
          </div>
        </div>
      </div>
      {isMenuOpen && options.length > 1 && (
        <div className={styles["drop-content"]} ref={menuRef}>
          {options
            .filter((item) => item !== selectedItem)
            .map((item) => (
              menuItemRender(item)
            ))}
        </div>
      )}
    </div>
  );
}
