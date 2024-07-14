"use client";

import PageComponent from "../../../shared/page/page";
import Badge from "../../../shared/badge/badge";
import styles from '../page.module.sass'

export default function Page() {
  return (
    <PageComponent title="Badge">
      <div className={styles["example-container"]}>
        <span className={styles["example-description"]}>Badges are small status descriptors for UI elements. A badge consists of a small circle, typically containing a number or other short set of characters, that appears in proximity to another object.</span>
        
        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Delete event</h3>
            <h4 className={styles["example-prop"]}>onDelete (( ) ={'>'} void) (default: undefined)</h4>
          </div>

          <p className={styles["example-value"]}>undefined</p>
          <div className={styles["row"]}>
            <Badge color="default">default</Badge>
            <Badge color="danger">danger</Badge>
            <Badge color="info">info</Badge>
            <Badge color="success">success</Badge>
            <Badge color="warning">warning</Badge>
          </div>

          <p className={styles["example-value"]}>delete action</p>
          <div className={styles["row"]}>
            <Badge color="default" onDelete={() => alert("default")}>
              default
            </Badge>
            <Badge color="danger" onDelete={() => alert("danger")}>
              danger
            </Badge>
            <Badge color="info" onDelete={() => alert("info")}>
              info
            </Badge>
            <Badge color="success" onDelete={() => alert("success")}>
              success
            </Badge>
            <Badge color="warning" onDelete={() => alert("warning")}>
              warning
            </Badge>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
