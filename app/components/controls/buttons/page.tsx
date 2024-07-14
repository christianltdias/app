"use client";

import { useRouter } from "next/navigation";
import PageComponent from "../../../../shared/page/page";
import styles from "../../page.module.sass";

export default function Page() {
  const router = useRouter();
  
  return (
    <PageComponent title="Controls">
      <div className={styles["example-container"]}>
        <div className={styles["example"]}>
          <h3 className={styles["example-title"]}>Buttons</h3>
          <h4 className={styles["example-prop"]}>Common, dropdowns, icon and multi</h4>
          <ul>
            <li onClick={() => router.push("/components/controls/buttons/common")}><a className={styles["example-link"]}>Common</a></li>
            <li onClick={() => router.push("/components/controls/buttons/dropdown")}><a className={styles["example-link"]}>Dropdowns</a></li>
            <li onClick={() => router.push("/components/controls/buttons/icon")}><a className={styles["example-link"]}>Icon</a></li>
            <li onClick={() => router.push("/components/controls/buttons/multi")}><a className={styles["example-link"]}>Multi</a></li>
          </ul>
        </div>
      </div>
    </PageComponent>
  );
}
