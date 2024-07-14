"use client";

import PageComponent from "../../../shared/page/page";
import BreadCrumb from "../../../shared/breadcrumb/breadcrumb";
import styles from '../page.module.sass'

export default function Page() {
  return (
    <PageComponent title="Breadcrumb">
      <div className={styles["example-container"]}>
        <span className={styles["example-description"]}>The Breadcrumb component is a trail of links that shows where the user currently is in the navigation structure of the project or workflow. The root of the trail (left-most link) represents the entry point of the user workflow or project, while the last link (right-most) the page (or pages) sitting hierarchically one level shallower than that of the current page.</span>
        <div className={styles["example"]}>
          <h3 className={styles["example-title"]}>Home as root</h3>
          <h4 className={styles["example-prop"]}>homeAsRoot (boolean) (default: true)</h4>
          <p className={styles["value"]}>true</p>
          <BreadCrumb />
          <p className={styles["value"]}>false</p>
          <BreadCrumb homeAsRoot={false} />
        </div>

        <div className={styles["example"]}>
          <h3 className={styles["example-title"]}>Capitalize names</h3>
          <h4 className={styles["example-prop"]}>capitalizeLinks (boolean) (default: true)</h4>
          <p className={styles["value"]}>true</p>
          <BreadCrumb />
          <p className={styles["value"]}>false</p>
          <BreadCrumb capitalizeLinks={false} />
        </div>

        <div className={styles["example"]}>
          <h3 className={styles["example-title"]}>Separators</h3>
          <h4 className={styles["example-prop"]}>separator (string) (default: ❯)</h4>
          <p className={styles["value"]}>❯</p>
          <BreadCrumb />
          <p className={styles["value"]}>custom separator (eg: /)</p>
          <BreadCrumb separator="/" />
        </div>
      </div>
    </PageComponent>
  );
}
