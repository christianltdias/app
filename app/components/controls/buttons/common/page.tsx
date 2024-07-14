"use client";

import Button from "../../../../../shared/controls/buttons/common/button";
import PageComponent from "../../../../../shared/page/page";
import styles from "../../../page.module.sass"

export default function Page() {
  return (
    <PageComponent title="Controls">
      <div className={styles["example-container"]}>
        <div className={styles["example"]}>
          <h3 className={styles["example-title"]}>Color</h3>
          <h4 className={styles["example-prop"]}>color (primary, secondary, success, cancel, warning and white) (default: primary)</h4>
          <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
            <Button onClick={() => alert("primary")}>Primary</Button>
            <Button onClick={() => alert("secondary")} color="secondary">Secondary</Button>
            <Button onClick={() => alert("secondary")} color="success">Sucess</Button>
            <Button onClick={() => alert("secondary")} color="cancel">Cancel</Button>
            <Button onClick={() => alert("secondary")} color="warning">Warning</Button>
            <div style={{backgroundColor: '#bbb', padding: '10px'}}>
              <Button onClick={() => alert("secondary")} color="white">White</Button>
            </div>
          </div>
        </div>
        <div className={styles["example"]}>
          <h3 className={styles["example-title"]}>Type</h3>
          <h4 className={styles["example-prop"]}>type (border, filled and empty) (default: border)</h4>
          
          <p className={styles["value"]}>border</p>
          <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
            <Button onClick={() => alert("primary")}>Primary</Button>
            <Button onClick={() => alert("secondary")} color="secondary">Secondary</Button>
            <Button onClick={() => alert("sucess")} color="success">Sucess</Button>
            <Button onClick={() => alert("cancel")} color="cancel">Cancel</Button>
            <Button onClick={() => alert("warning")} color="warning">Warning</Button>
            <div style={{backgroundColor: '#bbb', padding: '10px'}}>
              <Button onClick={() => alert("white")} color="white">White</Button>
            </div>
          </div>

          <p className={styles["value"]}>filled</p>
          <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
            <Button onClick={() => alert("primary")} type="filled">Primary</Button>
            <Button onClick={() => alert("secondary")} color="secondary" type="filled">Secondary</Button>
            <Button onClick={() => alert("sucess")} color="success" type="filled">Sucess</Button>
            <Button onClick={() => alert("cancel")} color="cancel" type="filled">Cancel</Button>
            <Button onClick={() => alert("warning")} color="warning" type="filled">Warning</Button>
            <div style={{backgroundColor: '#bbb', padding: '10px'}}>
              <Button onClick={() => alert("white")} color="white" type="filled">White</Button>
            </div>
          </div>

          <p className={styles["value"]}>empty</p>
          <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
            <Button onClick={() => alert("primary")} type="empty">Primary</Button>
            <Button onClick={() => alert("secondary")} color="secondary" type="empty">Secondary</Button>
            <Button onClick={() => alert("sucess")} color="success" type="empty">Sucess</Button>
            <Button onClick={() => alert("cancel")} color="cancel" type="empty">Cancel</Button>
            <Button onClick={() => alert("warning")} color="warning" type="empty">Warning</Button>
            <div style={{backgroundColor: '#bbb', padding: '10px'}}>
              <Button onClick={() => alert("white")} color="white" type="empty">White</Button>
            </div>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
