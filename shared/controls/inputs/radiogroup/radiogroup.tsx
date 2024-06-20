import { useState } from "react";
import RadioButton from "./radio";
import styles from "./radiogroup.module.sass";
import { concatStyles } from "../../../../utils/styles.utils";
import { InputColors } from "../../../../types/input.types";

type RadioGroupItem = {
  text: string;
  disabled?: boolean;
  data?: object;
};

type RadioGroupProps = {
  items: RadioGroupItem[];
  onChange: (index: number) => void;
  color?: InputColors;
  title?: string;
  direction?: "row" | "column";
  gap?: number;
  borderless?: boolean;
  colored?: boolean;
};

export default function RadioGroup({
  items,
  onChange,
  title,
  color = "default",
  direction = "column",
  gap = 10,
  borderless = false,
  colored = false,
}: RadioGroupProps) {
  const [selectedItem, setSelectedItem] = useState<number>(0);

  const handleItemClick = (index: number) => {
    onChange(index);
    setSelectedItem(index);
  };

  return (
    <div
      className={concatStyles(
        styles["container"],
        borderless ? styles["borderless"] : ""
      )}
    >
      {title && <p className={styles["title"]}>{title}</p>}
      <div
        className={styles["group"]}
        style={{ flexDirection: direction, gap: `${gap}px` }}
      >
        {items.map((item, index) => (
          <RadioButton
            color={color}
            colored={colored}
            disabled={item.disabled}
            value={selectedItem === index}
            onChange={() => handleItemClick(index)}
          >
            {item.text}
          </RadioButton>
        ))}
      </div>
    </div>
  );
}
