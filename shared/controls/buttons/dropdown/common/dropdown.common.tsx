import React, { ReactNode, useEffect, useRef, useState, useCallback } from "react";
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
  const [selectedItem, setSelectedItem] = useState<T | undefined>(selected);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [position, setPosition] = useState<'up' | 'down'>('down');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuHeight = 250;

  const handleDropdown = useCallback((action: boolean) => {
    if (isClosing) {
      dropdownRef.current?.blur();
      return;
    }
    if (!action && !isClosing) {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setIsOpen(false);
      }, 100);
    } else {
      setIsOpen(true);
    }
  }, [isClosing]);

  const handleSelection = (el: T) => {
    setSelectedItem(el);
    onSelect(el);
    setIsOpen(false);
  };

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
      {selectedItem && (
        <div className={styles["badge-container"]}>
          <Badge onDelete={() => handleSelection(undefined as unknown as T)} color={color}>
            {pickField(selectedItem)}
          </Badge>
        </div>
      )}
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setFilteredItems(filterFun(e.target.value))}
        onFocus={() => handleDropdown(true)}
        onBlur={() => handleDropdown(false)}
      />
      {isOpen && (
        <div
          className={concatStyles(
            styles["drop-wrapper"],
            styles[position],
            isClosing && styles["isClosing"]
          )}
        >
          <ul>
            {filteredItems.length > 0 ? (
              filteredItems.map((el) => (
                <li key={el.toString()} onMouseDown={() => handleSelection(el)}>
                  {renderItem ? renderItem(el) : pickField(el)}
                </li>
              ))
            ) : (
              <li className={styles["no-elements"]}>No elements found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}