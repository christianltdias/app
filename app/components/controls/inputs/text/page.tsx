"use client";

import Input from "../../../../../shared/controls/inputs/text/input";
import PageComponent from "../../../../../shared/page/page";
import styles from "../../../page.module.sass";

export default function Page() {
  return (
    <PageComponent title="Text Input">
      <div className={styles["example-container"]}>
        <span className={styles["example-description"]}></span>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Text</h3>
            <h4 className={styles["example-prop"]}>children (string)</h4>
          </div>
          <Input label="testing" onChange={(e) => console.log(e)} />
        </div>
      </div>
    </PageComponent>
  );
}
