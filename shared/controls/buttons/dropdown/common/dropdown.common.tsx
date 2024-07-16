import { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./dropdown.common.module.sass";
import Badge, { BadgeColors } from "../../../../badge/badge";
import { concatStyles } from "../../../../../utils/styles.utils";

type DropdownProps<T> = {
  items: T[];
  filterFun: (filterElement: string) => T[];
  onSelect: (el: T) => void;
  selected?: T;
  pickField?: (obj: T) => (Partial<T> & ReactNode) | ReactNode;
  renderItem?: (obj: T) => ReactNode;
  color?: BadgeColors;
};

export default function Dropdown<T>({
  items,
  filterFun,
  onSelect,
  selected,
  renderItem,
  pickField = (el) => `${el}`,
  color = "default",
}: DropdownProps<T>) {
  const [filteredItems, setFilteredItems] = useState<T[]>(items);
  const [selectedItem, setSelectedItem] = useState<T>(selected);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [position, setPosition] = useState<'up' | 'down'>('down');

  useEffect(() => {
    calculatePosition();
  }, [isOpen]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdown = (action: boolean) => {
    if (isClosing && dropdownRef.current) {
      dropdownRef.current.blur();
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

  const handleSelection = (el: T) => {
    if(el === selected)
    setSelectedItem(el)
    onSelect(el)
  }

  const calculatePosition = (): void => {
    if (dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      console.log(dropdownRect, viewportHeight)
      if (dropdownRect.bottom + 250 > viewportHeight) {
        setPosition('up');
      } else {
        setPosition('down');
      }
    }
  }

  return (
    <div
      ref={dropdownRef}
      className={concatStyles(
        styles["input-wrapper"],
        isOpen ? styles[color] : ""
      )}
      onFocus={(e) => e.stopPropagation()}
    >
      {selectedItem && (
        <div className={styles["badge-container"]}>
          <Badge onDelete={() => handleSelection(undefined)} color={color}>
            {pickField(selectedItem)}
          </Badge>
        </div>
      )}
      <input
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
            styles[position],
            isClosing && isOpen ? styles["isClosing"] : ""
          )}
        >
          <ul>
            {filteredItems.length > 0 ? (
              filteredItems.map((el) => {
                return (
                  <li onMouseDown={() => handleSelection(el)}>
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
