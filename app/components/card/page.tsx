"use client";

import { useState } from "react";
import Card from "../../../shared/card/card";
import Button from "../../../shared/controls/buttons/common/button";
import PageComponent from "../../../shared/page/page";
import styles from "../page.module.sass";
import Switch from "../../../shared/controls/inputs/switch/switch";

const text = `Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.`;

export default function Page() {
  const [includeImg, setIncludeImg] = useState<boolean>(true);
  const [includeText, setIncludeText] = useState<boolean>(true);
  const [includeTitle, setIncludeTitle] = useState<boolean>(true);
  const [includeControls, setIncludeControls] = useState<boolean>(true);

  return (
    <PageComponent title="Card">
      <div className={styles["example-container"]}>
        <span className={styles["example-description"]}>
          A Card is used to show content container for text, photos, and actions
          in the context of a single subject. It can contain Header, Subheader,
          header avatar, body, action buttons, image etc.
        </span>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Text</h3>
            <h4 className={styles["example-prop"]}>
              children (string){" "}
              <span className={styles["required"]}>*required</span>
            </h4>
          </div>
          <div className={styles["row"]}>
            <Card>
              <div style={{ width: "300px" }}>{text}</div>
            </Card>
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Image</h3>
            <h4 className={styles["example-prop"]}>
              img (string) (default: undefined)
            </h4>
            <h4 className={styles["example-note"]}>
              * It must be the image source path
            </h4>
          </div>
          <div className={styles["row"]}>
            <Card img="/test.png">
              <div style={{ width: "300px" }}>{text}</div>
            </Card>
          </div>
        </div>

        <div className={styles["try-yourself"]}>
          <h1 className={styles["try-title"]}>Try yourself</h1>
          <div className={styles["row"]}>
            <div className={styles["column--center"]}>
              <Card img={includeImg ? "/test.png" : undefined}>
                <div
                  style={{
                    width: "300px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {includeTitle && <h3>This is an example card</h3>}
                  {includeText ? text : ""}
                  {includeControls && (
                    <div
                      style={{
                        alignSelf: "flex-end",
                        display: "flex",
                        gap: "15px",
                        marginTop: "15px",
                      }}
                    >
                      <Button color="primary" onClick={() => alert("ok")}>
                        Ok
                      </Button>
                      <Button color="cancel" onClick={() => alert("close")}>
                        Close
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </div>
            <div className={styles["column"]}>
              <Switch value={includeImg} onChange={setIncludeImg}>
                Include Image
              </Switch>
              <Switch value={includeTitle} onChange={setIncludeTitle}>
                Include Title
              </Switch>
              <Switch value={includeText} onChange={setIncludeText}>
                Include Text
              </Switch>
              <Switch value={includeControls} onChange={setIncludeControls}>
                Include Controls
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
