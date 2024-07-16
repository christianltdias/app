"use client";

import { useRouter } from "next/navigation";
import PageComponent from "../../../../shared/page/page";
import { concatStyles } from "../../../../utils/styles.utils";
import styles from "../../page.module.sass";

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
                  router.push("/components/controls/buttons/common")
                }
              >
                Common
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>Basic buttons with a simple text to initiate an action.</h4>
          </div>
        </div>

        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() =>
                  router.push("/components/controls/buttons/dropdown")
                }
              >
                Dropdowns
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>Dropdown is an user interface element that allows users to select one or more items from a dropdown list.</h4>
          </div>
        </div>

        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() => router.push("/components/controls/buttons/icon")}
              >
                Icon
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>Icon buttons can contain a icon and a text for a interface element to allow user to execute an action.</h4>
          </div>
        </div>

        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() =>
                  router.push("/components/controls/buttons/multi")
                }
              >
                Multi
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>Multi buttons allows the use to select and action and execute them when clicked.</h4>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
