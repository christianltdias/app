"use client";

import { useRouter } from "next/navigation";
import PageComponent from "../../../shared/page/page";
import styles from "../page.module.sass";
import { concatStyles } from "../../../utils/styles.utils";

export default function Page() {
  const router = useRouter();

  return (
    <PageComponent title="Controls">
      <div className={styles["example-container"]}>
        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() => router.push("/components/controls/buttons")}
              >
                Buttons
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>A Button is a small, rectangular or circular element that is used to initiate an action.</h4>
          </div>
        </div>

        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() => router.push("/components/controls/inputs")}
              >
                Inputs
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>An Input is an element used to create interactive controls for forms in order to accept data from the user</h4>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
