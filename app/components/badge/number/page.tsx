"use client";

import PageComponent from "../../../../shared/page/page";
import styles from "../../page.module.sass";
import { useState } from "react";
import Switch from "../../../../shared/controls/inputs/switch/switch";
import Dropdown from "../../../../shared/controls/buttons/dropdown/common/dropdown.common";
import Input from "../../../../shared/controls/inputs/text/input";
import { CommonColors } from "../../../../types/global.types";
import NumberBadge from "../../../../shared/badge/numberbadge";

export default function Page() {
  const [hasOnDelete, setHasOnDelete] = useState<boolean>(false);
  const [color, setColor] = useState<CommonColors>("gray");
  const [value, setValue] = useState<number>(0);
  const colors: CommonColors[] = [
    "gray",
    "danger",
    "info",
    "success",
    "warning",
  ];

  return (
    <PageComponent title="Number Badge">
      <div className={styles["example-container"]}>
        <span className={styles["example-description"]}>
          Number Badges are small status descriptors for UI elements. A badge consists
          of a small circle, typically containing a number or other short set of
          characters, that appears in proximity to another object.
        </span>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Number</h3>
            <h4 className={styles["example-prop"]}>children (number) <span className={styles["required"]}>*required</span></h4>
          </div>
          <div className={styles["row"]}>
            <NumberBadge color="gray">{6}</NumberBadge>
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Color</h3>
            <h4 className={styles["example-prop"]}>
              color (gray, info, warning, danger and success) (default:
                gray)
            </h4>
          </div>
          <div className={styles["row"]}>
            <NumberBadge color="gray">{100}</NumberBadge>
            <NumberBadge color="danger">{100}</NumberBadge>
            <NumberBadge color="info">{100}</NumberBadge>
            <NumberBadge color="success">{100}</NumberBadge>
            <NumberBadge color="warning">{100}</NumberBadge>
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>On click event</h3>
            <h4 className={styles["example-prop"]}>
              onClick (( ) ={">"} void) (default: undefined)
            </h4>
          </div>

          <p className={styles["example-value"]}>undefined</p>
          <div className={styles["row"]}>
            <NumberBadge color="info">{60}</NumberBadge>
          </div>

          <p className={styles["example-value"]}>on click action</p>
          <div className={styles["row"]}>
            <NumberBadge color="info" onClick={() => alert(120)}>{120}</NumberBadge>
          </div>
        </div>

        <div className={styles["try-yourself"]}>
          <h1 className={styles["try-title"]}>Try yourself</h1>
          <div className={styles["row"]}>
            <div className={styles["column--center"]}>
              <NumberBadge
                onClick={hasOnDelete ? () => alert(value) : undefined}
                color={color}
              >
                {value}
              </NumberBadge>
            </div>
            <div className={styles["column"]}>
              <Switch
                value={hasOnDelete}
                onChange={() => setHasOnDelete(!hasOnDelete)}
              >
                On Click
              </Switch>
              <Input
                label="badge text"
                onChange={(text) => setValue(Number(text))}
                value={value.toString()}
              />
              <Dropdown
                items={colors}
                filterFun={(str) =>
                  colors.filter((color) =>
                    color.toLowerCase().includes(str.toLowerCase())
                  )
                }
                onSelect={(el) => setColor(el)}
                selected={color}
                color={color}
              />
            </div>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}