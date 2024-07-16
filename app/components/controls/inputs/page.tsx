"use client";

import { useRouter } from "next/navigation";
import PageComponent from "../../../../shared/page/page";
import styles from "../../page.module.sass";
import { concatStyles } from "../../../../utils/styles.utils";

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
                  router.push("/components/controls/inputs/checkbox")
                }
              >
                Checkbox
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>TO DO</h4>
          </div>
        </div>

        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() =>
                  router.push("/components/controls/inputs/radiogroup")
                }
              >
                Radio Group
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>TO DO</h4>
          </div>
        </div>

        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() =>
                  router.push("/components/controls/inputs/slider")
                }
              >
                Slider
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>TO DO</h4>
          </div>
        </div>

        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() =>
                  router.push("/components/controls/inputs/switch")
                }
              >
                Switch
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>TO DO</h4>
          </div>
        </div>

        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() => router.push("/components/controls/inputs/text")}
              >
                Text
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>TO DO</h4>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
