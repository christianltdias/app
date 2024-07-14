"use client";

import { useRouter } from "next/navigation";
import PageComponent from "../../../../shared/page/page";
import styles from "../../page.module.sass"

export default function Page() {
  const router = useRouter();
  
  return (
    <PageComponent title="Controls">
      <div className={styles["example-container"]}>
        <div className={styles["example"]}>
          <h3 className={styles["example-title"]} onClick={() => router.push("/components/controls/inputs")}><a className={styles["example-link"]}>Inputs</a></h3>
          <h4 className={styles["example-prop"]}>Checkbox, radiogroup, slider, switch and text</h4>
          <ul>
            <li onClick={() => router.push("/components/controls/inputs/checkbox")}><a className={styles["example-link"]}>Checkbox</a></li>
            <li onClick={() => router.push("/components/controls/inputs/radiogroup")}><a className={styles["example-link"]}>Radio Group</a></li>
            <li onClick={() => router.push("/components/controls/inputs/slider")}><a className={styles["example-link"]}>Slider</a></li>
            <li onClick={() => router.push("/components/controls/inputs/switch")}><a className={styles["example-link"]}>Switch</a></li>
            <li onClick={() => router.push("/components/controls/inputs/text")}><a className={styles["example-link"]}>Text</a></li>
          </ul>
        </div>
      </div>
    </PageComponent>
  );
}
