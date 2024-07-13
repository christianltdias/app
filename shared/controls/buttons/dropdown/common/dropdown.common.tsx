import { ReactNode, useRef, useState } from "react";
import styles from "./dropdown.common.module.sass";
import Badge, { BadgeColors } from "../../../../badge/badge";
import { concatStyles } from "../../../../../utils/styles.utils";

type DropdownProps<T> = {
  items: T[];
  filterFun: (filterElement: string) => T[];
  pickField?: (obj: T) => (Partial<T> & ReactNode) | ReactNode;
  renderItem?: (obj: T) => ReactNode;
  color?: BadgeColors;
};

export default function Dropdown<T>({
  items,
  filterFun,
  renderItem,
  pickField = (el) => `${el}`,
  color = "default",
}: DropdownProps<T>) {
  const [filteredItems, setFilteredItems] = useState<T[]>(items);
  const [selectedItem, setSelectedItem] = useState<T>(undefined);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDropdown = (action: boolean) => {
    if (isClosing && inputRef.current) {
      inputRef.current.blur();
      return;
    }
    if (action === false && !isClosing) {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setIsOpen(false);
      }, 100);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div
      className={concatStyles(
        styles["input-wrapper"],
        isOpen ? styles[color] : ""
      )}
      onFocus={(e) => e.stopPropagation()}
    >
      {selectedItem && (
        <div className={styles["badge-container"]}>
          <Badge onDelete={() => setSelectedItem(undefined)} color={color}>
            {pickField(selectedItem)}
          </Badge>
        </div>
      )}
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        onChange={(str) => setFilteredItems(filterFun(str.target.value))}
        onFocus={() => handleDropdown(true)}
        onBlur={() => handleDropdown(false)}
      />
      {isOpen && (
        <div
          className={concatStyles(
            styles["drop-wrapper"],
            isClosing && isOpen ? styles["isClosing"] : ""
          )}
        >
          <ul>
            {filteredItems.length > 0 ? (
              filteredItems.map((el) => {
                return (
                  <li onMouseDown={() => setSelectedItem(el)}>
                    {renderItem ? renderItem(el) : pickField(el)}
                  </li>
                );
              })
            ) : (
              <li className={styles["no-elements"]}>No elements found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
