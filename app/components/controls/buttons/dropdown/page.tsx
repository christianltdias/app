"use client";

import { useRouter } from "next/navigation";
import PageComponent from "../../../../../shared/page/page";
import { concatStyles } from "../../../../../utils/styles.utils";
import styles from "../../../page.module.sass"

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
                onClick={() =>
                  router.push("/components/controls/buttons/dropdown/common")
                }
              >
                Common
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>
              Basic dropdown with a single select option.
            </h4>
          </div>
        </div>

        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() =>
                  router.push("/components/controls/buttons/dropdown/multi")
                }
              >
                Multi
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>
              Multi option dropdown that allows a multi selection from the user.
            </h4>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
