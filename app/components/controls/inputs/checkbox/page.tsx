"use client";

import { useState } from "react";
import CheckBox from "../../../../../shared/controls/inputs/checkbox/checkbox";
import PageComponent from "../../../../../shared/page/page";
import styles from "../../../page.module.sass";
import Input from "../../../../../shared/controls/inputs/text/input";
import { CommonColors } from "../../../../../types/global.types";
import Switch from "../../../../../shared/controls/inputs/switch/switch";
import Dropdown from "../../../../../shared/controls/buttons/dropdown/common/dropdown.common";

export default function Page() {
  const [isText, setIsText] = useState<boolean>(false);
  const [isOnChange, setIsOnChange] = useState<boolean>(false);
  const [isValue, setIsValue] = useState<boolean>(false);
  const [isColor, setIsColor] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isColored, setIsColored] = useState<boolean>(false);

  const [isExample, setIsExample] = useState<boolean>(false);
  const [text, setText] = useState<string>("try yourself");
  const [color, setColor] = useState<CommonColors>("info");
  const [isExampleDisabled, setIsExampleDisabled] = useState<boolean>(false);
  const [isExampleColored, setIsExampleColored] = useState<boolean>(false);

  const colors: CommonColors[] = [
    "gray",
    "danger",
    "info",
    "success",
    "warning",
  ];
  return (
    <PageComponent title="Controls">
      <div className={styles["example-container"]}>
        <span className={styles["example-description"]}>
          Badges are small status descriptors for UI elements. A badge consists
          of a small circle, typically containing a number or other short set of
          characters, that appears in proximity to another object.
        </span>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Text</h3>
            <h4 className={styles["example-prop"]}>children (string)</h4>
          </div>

          <p className={styles["example-value"]}>with text</p>
          <div className={styles["row"]}>
            <CheckBox value={isText} onChange={setIsText}>
              test
            </CheckBox>
          </div>

          <p className={styles["example-value"]}>without text</p>
          <div className={styles["row"]}>
            <CheckBox value={isText} onChange={setIsText} />
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>On change event</h3>
            <h4 className={styles["example-prop"]}>
              onChange ((e: boolean) ={">"} void){" "}
              <span className={styles["required"]}>*required</span>
            </h4>
          </div>
          <CheckBox value={isOnChange} onChange={setIsOnChange}>
            on click
          </CheckBox>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Value</h3>
            <h4 className={styles["example-prop"]}>
              value (boolean){" "}
              <span className={styles["required"]}>*required</span>
            </h4>
          </div>
          <div className={styles["row"]}>
            <CheckBox value={isValue} onChange={setIsValue}>
              value test
            </CheckBox>
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Color</h3>
            <h4 className={styles["example-prop"]}>
              color (gray, info, warning, danger and success) (default: gray)
            </h4>
          </div>

          <p className={styles["example-value"]}>gray</p>
          <div className={styles["row"]}>
            <CheckBox
              value={isColor}
              onChange={setIsColor}
              color="gray"
              colored
            >
              gray
            </CheckBox>
          </div>

          <p className={styles["example-value"]}>danger</p>
          <div className={styles["row"]}>
            <CheckBox
              value={isColor}
              onChange={setIsColor}
              color="danger"
              colored
            >
              danger
            </CheckBox>
          </div>

          <p className={styles["example-value"]}>info</p>
          <div className={styles["row"]}>
            <CheckBox
              value={isColor}
              onChange={setIsColor}
              color="info"
              colored
            >
              info
            </CheckBox>
          </div>

          <p className={styles["example-value"]}>success</p>
          <div className={styles["row"]}>
            <CheckBox
              value={isColor}
              onChange={setIsColor}
              color="success"
              colored
            >
              success
            </CheckBox>
          </div>

          <p className={styles["example-value"]}>warning</p>
          <div className={styles["row"]}>
            <CheckBox
              value={isColor}
              onChange={setIsColor}
              color="warning"
              colored
            >
              warning
            </CheckBox>
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Disabled</h3>
            <h4 className={styles["example-prop"]}>
              disabled (boolean) (default: false)
            </h4>
          </div>

          <p className={styles["example-value"]}>enabled</p>
          <div className={styles["row"]}>
            <CheckBox value={isDisabled} onChange={setIsDisabled}>
              enabled
            </CheckBox>
          </div>

          <p className={styles["example-value"]}>disabled</p>
          <div className={styles["row"]}>
            <CheckBox value={isDisabled} onChange={setIsDisabled} disabled>
              disabled
            </CheckBox>
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Colored</h3>
            <h4 className={styles["example-prop"]}>
              colored (boolean) (default: false)
            </h4>
          </div>

          <p className={styles["example-value"]}>colored</p>
          <div className={styles["row"]}>
            <CheckBox value={isColored} onChange={setIsColored} colored>
              colored
            </CheckBox>
          </div>

          <p className={styles["example-value"]}>not colored</p>
          <div className={styles["row"]}>
            <CheckBox value={isColored} onChange={setIsColored}>
              not colored
            </CheckBox>
          </div>
        </div>

        <div className={styles["try-yourself"]}>
          <h1 className={styles["try-title"]}>Try yourself</h1>
          <div className={styles["row"]}>
            <div className={styles["column--center"]}>
              <CheckBox
                value={isExample}
                onChange={setIsExample}
                color={color}
                disabled={isExampleDisabled}
                colored={isExampleColored}
              >
                {text}
              </CheckBox>
            </div>
            <div className={styles["column"]}>
              <Switch
                value={isExample}
                onChange={() => setIsExample(!isExample)}
              >
                Is checked
              </Switch>
              <Input
                label="badge text"
                onChange={(text) => setText(text)}
                value={text}
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
              <Switch
                value={isExampleDisabled}
                onChange={() => setIsExampleDisabled(!isExampleDisabled)}
              >
                Is disabled
              </Switch>
              <Switch
                value={isExampleColored}
                onChange={() => setIsExampleColored(!isExampleColored)}
              >
                Is colored
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
