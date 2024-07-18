"use client";

import CheckBox from "../../../../../shared/controls/inputs/checkbox/checkbox";
import PageComponent from "../../../../../shared/page/page";
import styles from "../../../page.module.sass";

export default function Page() {
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
            <h4 className={styles["example-prop"]}>children (string) <span className={styles["required"]}>*required</span></h4>
          </div>
          <div className={styles["row"]}>
            <CheckBox value={true} onChange={(value) => console.log(value)}>test</CheckBox>
          </div>
        </div>

        <div className={styles["try-yourself"]}>
          <h1 className={styles["try-title"]}>Try yourself</h1>
          <div className={styles["row"]}>
            <div className={styles["column--center"]}>
              <CheckBox value={true} onChange={(value) => console.log(value)}>test</CheckBox>
            </div>
            <div className={styles["column"]}>
            </div>
          </div>
        </div>
        
      </div>
    </PageComponent>
  );
}
