"use client";

import PageComponent from "../../../shared/page/page";
import BreadCrumb from "../../../shared/breadcrumb/breadcrumb";
import styles from '../page.module.sass'
import { useState } from "react";
import Switch from "../../../shared/controls/inputs/switch/switch";
import Input from "../../../shared/controls/inputs/text/input";

export default function Page() {
  const [separator, setSeparator] = useState<string>("❯");
  const [isHome, setIsHome] = useState<boolean>(true);
  const [isCapitalize, setIsCapitalize] = useState<boolean>(true);

  return (
    <PageComponent title="Breadcrumb">
      <div className={styles["example-container"]}>
        <span className={styles["example-description"]}>The Breadcrumb component is a trail of links that shows where the user currently is in the navigation structure of the project or workflow. The root of the trail (left-most link) represents the entry point of the user workflow or project, while the last link (right-most) the page (or pages) sitting hierarchically one level shallower than that of the current page.</span>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Home as root</h3>
            <h4 className={styles["example-prop"]}>homeAsRoot (boolean) (default: true)</h4>
          </div>
          
          <p className={styles["example-value"]}>true</p>
          <BreadCrumb />
          <p className={styles["example-value"]}>false</p>
          <BreadCrumb homeAsRoot={false} />
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Capitalize names</h3>
            <h4 className={styles["example-prop"]}>capitalizeLinks (boolean) (default: true)</h4>
          </div>

          <p className={styles["example-value"]}>true</p>
          <BreadCrumb />
          <p className={styles["example-value"]}>false</p>
          <BreadCrumb capitalizeLinks={false} />
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>Separators</h3>
            <h4 className={styles["example-prop"]}>separator (string) (default: ❯)</h4>
          </div>

          <p className={styles["example-value"]}>❯</p>
          <BreadCrumb />
          <p className={styles["example-value"]}>custom separator (eg: /)</p>
          <BreadCrumb separator="/" />
        </div>

        <div className={styles["try-yourself"]}>
          <h1 className={styles["try-title"]}>Try yourself</h1>
          <div className={styles["row"]}>
            <div className={styles["column--center"]}>
              <BreadCrumb separator={separator} homeAsRoot={isHome} capitalizeLinks={isCapitalize}/>
            </div>
            <div className={styles["column"]}>
                <Switch
                  value={isHome}
                  onChange={setIsHome}
                >
                  Home as root?
                </Switch>
                <Switch
                  value={isCapitalize}
                  onChange={setIsCapitalize}
                >
                  Capitalize names?
                </Switch>
                <Input
                  label="Separator"
                  onChange={setSeparator}
                  value={separator}
                />
            </div>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
