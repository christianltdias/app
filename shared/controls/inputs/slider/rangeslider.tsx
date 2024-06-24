import { useEffect, useState } from "react";
import { InputColors } from "../../../../types/input.types";
import styles from "./rangeslider.module.sass";
import { concatStyles } from "../../../../utils/styles.utils";

type RangeSliderProps = {
  onChange: (value: {min: number, max: number}) => void;
  color?: InputColors;
  step: number;
  value: {min: number, max: number};
  min: number;
  max: number;
};

export default function RangeSlider({
  onChange,
  step,
  value,
  min,
  max,
  color = "default",
}: RangeSliderProps) {
  const [minValue, setMinValue] = useState(value ? value.min : min);
  const [maxValue, setMaxValue] = useState(value ? value.max : max);

  useEffect(() => {
    if (value) {
      setMinValue(value.min);
      setMaxValue(value.max);
    }
  }, [value]);

  const handleMinChange = (e) => {
    e.preventDefault();
    const newMinVal = Math.min(+e.target.value, maxValue - step);
    if (!value) setMinValue(newMinVal);
    onChange({ min: newMinVal, max: maxValue });
  };

  const handleMaxChange = (e) => {
    e.preventDefault();
    const newMaxVal = Math.max(+e.target.value, minValue + step);
    if (!value) setMaxValue(newMaxVal);
    onChange({ min: minValue, max: newMaxVal });
  };

  const minPos = ((minValue - min) / (max - min)) * 100;
  const maxPos = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["input-wrapper"]}>
        <input
          className={styles["input"]}
          type="range"
          value={minValue}
          min={min}
          max={max}
          step={step}
          onChange={handleMinChange}
        />
        <input
          className={styles["input"]}
          type="range"
          value={maxValue}
          min={min}
          max={max}
          step={step}
          onChange={handleMaxChange}
        />
      </div>

      <div className={styles["control-wrapper"]}>
        <div className={concatStyles(styles["control"], styles[color])} style={{ left: `${minPos}%` }} />
        <div className={styles["rail"]}>
          <div
            className={concatStyles(styles["inner-rail"], styles[color])}
            style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
          />
        </div>
        <div className={concatStyles(styles["control"], styles[color])} style={{ left: `${maxPos}%` }} />
      </div>
    </div>
  );
}
