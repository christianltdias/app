import { ChangeEvent, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import Badge, { BadgeColors } from "../../../../badge/badge";
import { concatStyles } from "../../../../../utils/styles.utils";
import NumberBadge from "../../../../badge/numberbadge";
import CheckBox from "../../../inputs/checkbox/checkbox";
import styles from "./dropdown.multi.module.sass";

type DropdownProps<T> = {
  items: T[];
  filterFun: (filterElement: string) => T[];
  onSelect: (el: T) => void;
  selectedItems?: T[];
  pickField?: (obj: T) => (Partial<T> & ReactNode) | ReactNode;
  renderItem?: (obj: T) => ReactNode;
  color?: BadgeColors;
};

export default function MultiSelectDropdown<T>({
  items,
  filterFun,
  renderItem,
  pickField = (el) => `${el}`,
  color = "default",
}: DropdownProps<T>) {
  const [filteredItems, setFilteredItems] = useState<T[]>(items);
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [position, setPosition] = useState<'up' | 'down'>('down');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuHeight = 250;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const filteredItems = filterFun(e.target.value);
    setFilteredItems(filteredItems);
    setValue(e.target.value);
  };

  const handleCountBadgeClick = () => {
    setValue("!!");
    setIsOpen(true);
    setFilteredItems(items);
  };

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

  const addItem = (item: T) => {
    if (!selectedItems.find((el) => el === item)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const removeItem = (item: T) => {
    setSelectedItems(selectedItems.filter((el) => el !== item));
  };

  const handleSelection = (item: T) => {
    if (selectedItems.includes(item)) {
      removeItem(item);
    } else {
      addItem(item);
    }
  };

  const listItems = value === "!!" ? selectedItems : filteredItems;

  const calculatePosition = useCallback(() => {
    if (dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      setPosition(dropdownRect.bottom + menuHeight > viewportHeight ? 'up' : 'down');
    }
  }, [menuHeight]);

  useEffect(() => {
    if (isOpen) {
      calculatePosition();
    }
  }, [isOpen, calculatePosition]);

  return (
    <div
      ref={dropdownRef}
      className={concatStyles(styles["input-wrapper"], isOpen && styles[color])}
      onFocus={(e) => e.stopPropagation()}
    >
      {(selectedItems && selectedItems.length > 0) && (
        <div className={styles["badge-container"]}>
          <Badge onDelete={() => removeItem(selectedItems[0])} color={color}>
            {pickField(selectedItems[0])}
          </Badge>
          {selectedItems.length - 1 > 0 && (
            <NumberBadge
              number={selectedItems.length - 1}
              color={color}
              onClick={handleCountBadgeClick}
            />
          )}
        </div>
      )}
      <input
        ref={inputRef}
        type="text"
        value={value}
        placeholder="Search..."
        onChange={handleOnChange}
        onFocus={() => handleDropdown(true)}
      />
      {isOpen && (
        <div
          className={concatStyles(
            styles["drop-wrapper"],
            isClosing && isOpen ? styles["isClosing"] : ""
          )}
          onBlur={() => handleDropdown(false)}
        >
          <ul>
            {listItems.length > 0 ? (
              [
                <li>
                  <CheckBox
                    value={selectedItems.length === items.length}
                    onChange={() => setSelectedItems(items)}
                  />
                  Select All
                </li>,
                ...listItems.map((el) => {
                  return (
                    <li onMouseDown={() => addItem(el)}>
                      <CheckBox
                        value={selectedItems.includes(el)}
                        onChange={() => handleSelection(el)}
                      />
                      {renderItem ? renderItem(el) : pickField(el)}
                    </li>
                  );
                }),
              ]
            ) : (
              <li className={styles["no-elements"]}>No elements found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
