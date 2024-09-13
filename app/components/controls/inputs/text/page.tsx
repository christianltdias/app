"use client";

import { useState } from "react";
import Input from "../../../../../shared/controls/inputs/text/input";
import PageComponent from "../../../../../shared/page/page";
import {
  maxLength,
  minLength,
  required,
} from "../../../../../utils/validators.utils";
import styles from "../../../page.module.sass";

export default function Page() {
  const [valueExample, setValueExample] = useState("");
  return (
    <PageComponent title="Text Input">
      <div className={styles["example-container"]}>
        <span className={styles["example-description"]}></span>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Text</h3>
            <h4 className={styles["example-prop"]}>
              value (string){" "}
              <span className={styles["required"]}>*required</span>
            </h4>
          </div>
          <div className={styles["short"]}>
            <Input
              label="text"
              value={valueExample}
              onChange={setValueExample}
            />
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Label</h3>
            <h4 className={styles["example-prop"]}>
              label (string){" "}
              <span className={styles["required"]}>*required</span>
            </h4>
          </div>
          <div className={styles["short"]}>
            <Input
              label="label / placeholder"
              value={valueExample}
              onChange={setValueExample}
            />
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>On change Event</h3>
            <h4 className={styles["example-prop"]}>
              onChange (( ) ={">"} void){" "}
              <span className={styles["required"]}>*required</span>
            </h4>
          </div>
          <div className={styles["short"]}>
            <Input
              label="on change event example"
              value={valueExample}
              onChange={setValueExample}
            />
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Color</h3>
            <h4 className={styles["example-prop"]}>
              color (gray, info, warning, danger and success) (default: info)
            </h4>
          </div>
          <div className={styles["short"]}>
            <Input
              label="info"
              value={valueExample}
              onChange={setValueExample}
              color="info"
            />

            <Input
              label="danger"
              value={valueExample}
              onChange={setValueExample}
              color="danger"
            />

            <Input
              label="gray"
              value={valueExample}
              onChange={setValueExample}
              color="gray"
            />

            <Input
              label="success"
              value={valueExample}
              onChange={setValueExample}
              color="success"
            />

            <Input
              label="warning"
              value={valueExample}
              onChange={setValueExample}
              color="warning"
            />
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Type</h3>
            <h4 className={styles["example-prop"]}>
              type (text, password) (default: text)
            </h4>
          </div>
          <div className={styles["short"]}>
            <Input
              label="text example"
              value={valueExample}
              onChange={setValueExample}
              type="text"
            />

            <Input
              label="password example"
              value={valueExample}
              onChange={setValueExample}
              type="password"
            />
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Width</h3>
            <h4 className={styles["example-prop"]}>width (string) (default: null)</h4>
          </div>
          <div className={styles["short"]}>
            <Input
              label="200px width example"
              value={valueExample}
              onChange={setValueExample}
              width="200px"
            />
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Validators</h3>
            <h4 className={styles["example-prop"]}>validators ((value: string) ={">"} string | null) (default: [])</h4>
          </div>
          <div className={styles["short"]}>
            <Input
              label="max length"
              value={valueExample}
              onChange={setValueExample}
              validators={[maxLength(10)]}
              autoValidate
            />

            <Input
              label="min length"
              value={valueExample}
              onChange={setValueExample}
              validators={[minLength(20)]}
              autoValidate
            />

            <Input
              label="required"
              value={valueExample}
              onChange={setValueExample}
              validators={[required]}
              autoValidate
            />
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Auto validate</h3>
            <h4 className={styles["example-prop"]}>autoValidate (boolean) (default: false)</h4>
          </div>
          <div className={styles["short"]}>
            <Input
              label="Auto validate example"
              value={valueExample}
              onChange={setValueExample}
            />
          </div>
        </div>

      </div>
    </PageComponent>
  );
}
