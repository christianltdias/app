"use client";

import CheckBox from "../../../../../shared/controls/inputs/checkbox/checkbox";
import PageComponent from "../../../../../shared/page/page";
import styles from "../../../page.module.sass";

export default function Page() {
  return (
    <PageComponent title="Controls">
      <div className={styles["example-container"]}>
        <span className={styles["example-description"]}>
          Badges are small status descriptors for UI elements. A badge consists
          of a small circle, typically containing a number or other short set of
          characters, that appears in proximity to another object.
        </span>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Text</h3>
            <h4 className={styles["example-prop"]}>children (string)</h4>
          </div>

          <p className={styles["example-value"]}>with text</p>
          <div className={styles["row"]}>
            <CheckBox value={true} onChange={(value) => console.log(value)}>
              test
            </CheckBox>
          </div>

          <p className={styles["example-value"]}>without text</p>
          <div className={styles["row"]}>
            <CheckBox value={true} onChange={(value) => console.log(value)} />
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>On change event</h3>
            <h4 className={styles["example-prop"]}>
              onChange ((e: boolean) ={">"} void) <span className={styles["required"]}>*required</span>
            </h4>
          </div>
            <CheckBox value={true} onChange={(value) => alert(value)} >on click</CheckBox>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Value</h3>
            <h4 className={styles["example-prop"]}>
              value (boolean){" "}
              <span className={styles["required"]}>*required</span>
            </h4>
          </div>
          <div className={styles["row"]}>
            <CheckBox value={true} onChange={(value) => console.log(value)}>
              value test
            </CheckBox>
          </div>
        </div>

        
        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Color</h3>
            <h4 className={styles["example-prop"]}>color (gray, info, warning, danger and success) (default:
              gray)</h4>
          </div>

          <p className={styles["example-value"]}>gray</p>
          <div className={styles["row"]}>
            <CheckBox value={true} onChange={(value) => console.log(value)} color="gray" colored>
              gray
            </CheckBox>
          </div>

          <p className={styles["example-value"]}>danger</p>
          <div className={styles["row"]}>
            <CheckBox value={true} onChange={(value) => console.log(value)} color="danger" colored>
              danger
            </CheckBox>
          </div>

          <p className={styles["example-value"]}>info</p>
          <div className={styles["row"]}>
            <CheckBox value={true} onChange={(value) => console.log(value)} color="info" colored>
              info
            </CheckBox>
          </div>
          
          <p className={styles["example-value"]}>success</p>
          <div className={styles["row"]}>
            <CheckBox value={true} onChange={(value) => console.log(value)} color="success" colored>
              success
            </CheckBox>
          </div>
          
          <p className={styles["example-value"]}>warning</p>
          <div className={styles["row"]}>
            <CheckBox value={true} onChange={(value) => console.log(value)} color="warning" colored>
              warning
            </CheckBox>
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Disabled</h3>
            <h4 className={styles["example-prop"]}>disabled (boolean) (default: false)</h4>
          </div>

          <p className={styles["example-value"]}>enabled</p>
          <div className={styles["row"]}>
            <CheckBox value={true} onChange={(value) => console.log(value)}>
              enabled
            </CheckBox>
          </div>

          <p className={styles["example-value"]}>disabled</p>
          <div className={styles["row"]}>
            <CheckBox value={true} onChange={(value) => console.log(value)} disabled>
              disabled
            </CheckBox>
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Colored</h3>
            <h4 className={styles["example-prop"]}>colored (boolean) (default: false)</h4>
          </div>

          <p className={styles["example-value"]}>colored</p>
          <div className={styles["row"]}>
            <CheckBox value={true} onChange={(value) => console.log(value)} colored>
              colored
            </CheckBox>
          </div>

          <p className={styles["example-value"]}>not colored</p>
          <div className={styles["row"]}>
            <CheckBox value={true} onChange={(value) => console.log(value)}>
              not colored
            </CheckBox>
          </div>
        </div>

        <div className={styles["try-yourself"]}>
          <h1 className={styles["try-title"]}>Try yourself</h1>
          <div className={styles["row"]}>
            <div className={styles["column--center"]}>
              <CheckBox value={true} onChange={(value) => console.log(value)}>
                test
              </CheckBox>
            </div>
            <div className={styles["column"]}></div>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
