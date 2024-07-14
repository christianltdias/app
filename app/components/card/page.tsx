"use client";

import Card from "../../../shared/card/card";
import Button from "../../../shared/controls/buttons/common/button";
import PageComponent from "../../../shared/page/page";
import styles from "../page.module.sass";

export default function Page() {
  return (
    <PageComponent title="Card">
      <div className={styles["example-container"]}>
        <span className={styles["example-description"]}>A Card is used to show content container for text, photos, and actions in the context of a single subject. It can contain Header, Subheader, header avatar, body, action buttons, image etc.</span>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Image</h3>
            <h4 className={styles["example-prop"]}>
              img (string) (default: undefined)
            </h4>
          </div>
          <div className={styles["row"]}>
            <Card>
              <div style={{ width: "300px" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </div>
            </Card>
            <Card img="/test.png">
              <div style={{ width: "300px" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </div>
            </Card>
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>  
            <h3 className={styles["example-title"]}>Example</h3>
            <h4 className={styles["example-prop"]}>Card with image, content and buttons example</h4>
          </div>
          <Card img="/test.png">
            <div style={{ width: "300px", display: 'flex', flexDirection: 'column'}}>
              <h3>This is an example card</h3>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
              <div style={{alignSelf: 'flex-end', display: 'flex', gap: '15px', marginTop: '15px'}}>
                <Button color="primary" onClick={() => alert("ok")}>Ok</Button>
                <Button color="cancel" onClick={() => alert("close")}>Close</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageComponent>
  );
}
