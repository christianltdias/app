"use client";

import PageComponent from "../../../../shared/page/page";
import Badge from "../../../../shared/badge/badge";
import styles from "../../page.module.sass";
import { useState } from "react";
import Switch from "../../../../shared/controls/inputs/switch/switch";
import Dropdown from "../../../../shared/controls/buttons/dropdown/common/dropdown.common";
import Input from "../../../../shared/controls/inputs/text/input";
import { CommonColors } from "../../../../types/global.types";

export default function Page() {
  const [hasOnDelete, setHasOnDelete] = useState<boolean>(false);
  const [color, setColor] = useState<CommonColors>("gray");
  const [value, setValue] = useState<string>("try yourself!");
  const colors: CommonColors[] = [
    "gray",
    "danger",
    "info",
    "success",
    "warning",
  ];

  return (
    <PageComponent title="Text Badge">
      <div className={styles["example-container"]}>
        <span className={styles["example-description"]}>
          Badges are small status descriptors for UI elements. A badge consists
          of a small circle, typically containing a number or other short set of
          characters, that appears in proximity to another object.
        </span>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Text</h3>
            <h4 className={styles["example-prop"]}>children (string) <span className={styles["required"]}>*required</span></h4>
          </div>
          <div className={styles["row"]}>
            <Badge color="gray">badge value</Badge>
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
            <Badge color="gray">default</Badge>
            <Badge color="danger">danger</Badge>
            <Badge color="info">info</Badge>
            <Badge color="success">success</Badge>
            <Badge color="warning">warning</Badge>
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Delete event</h3>
            <h4 className={styles["example-prop"]}>
              onDelete (( ) ={">"} void) (default: undefined)
            </h4>
          </div>

          <p className={styles["example-value"]}>undefined</p>
          <div className={styles["row"]}>
            <Badge>no event</Badge>
          </div>

          <p className={styles["example-value"]}>delete action</p>
          <div className={styles["row"]}>
            <Badge onDelete={() => alert("default")}>
              with event
            </Badge>
          </div>
        </div>

        <div className={styles["try-yourself"]}>
          <h1 className={styles["try-title"]}>Try yourself</h1>
          <div className={styles["row"]}>
            <div className={styles["column--center"]}>
              <Badge
                onDelete={hasOnDelete ? () => alert(value) : undefined}
                color={color}
              >
                {value}
              </Badge>
            </div>
            <div className={styles["column"]}>
              <Switch
                value={hasOnDelete}
                onChange={() => setHasOnDelete(!hasOnDelete)}
              >
                On Delete
              </Switch>
              <Input
                label="badge text"
                onChange={setValue}
                value={value}
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
