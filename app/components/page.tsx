"use client";

import { useRouter } from "next/navigation";
import PageComponent from "../../shared/page/page";
import styles from './page.module.sass'

export default function Page() {
  const router = useRouter();

  return (
    <PageComponent title="Home">
      <h1>Component List</h1>
      <div className={styles["example-container"]}>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}><span className={styles["example-link"]} onClick={() => router.push("/components/badge")}>Badge</span></h3>
            <h4 className={styles["example-prop"]}>Badges are small status descriptors for UI elements.</h4>
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}><span className={styles["example-link"]} onClick={() => router.push("/components/breadcrumb")}>Breadcrumb</span></h3>
            <h4 className={styles["example-prop"]}>The Breadcrumb component is a trail of links that shows where the user currently is in the navigation structure of the project or workflow</h4>
          </div>
        </div>

        <div className={styles["example"]}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}><span className={styles["example-link"]} onClick={() => router.push("/components/calendar")}>Calendar</span></h3>
            <h4 className={styles["example-prop"]}>TO DO</h4>
          </div>
        </div>

      </div>


      <ul>
        <li><p className={styles["example-link"]} onClick={() => router.push("/components/card")}>Card</p></li>
        <li>
          <p className={styles["example-link"]} onClick={() => router.push("/components/container")}>Container</p>
          <ul>
            <li>
              Drag Items
            </li>
          </ul>
        </li>
        <li>
          <p className={styles["example-link"]} onClick={() => router.push("/components/controls")}>Controls</p>
          <ul>
            <li>
              <p className={styles["example-link"]} onClick={() => router.push("/components/controls/buttons")}>Buttons</p>
              <ul>
                <li><p className={styles["example-link"]} onClick={() => router.push("/components/controls/buttons/common")}>Common</p></li>
                <li><p className={styles["example-link"]} onClick={() => router.push("/components/controls/buttons/dropdown")}>Dropdown</p></li>
                <li><p className={styles["example-link"]} onClick={() => router.push("/components/controls/buttons/icon")}>Icon</p></li>
                <li><p className={styles["example-link"]} onClick={() => router.push("/components/controls/buttons/multi")}>Multi</p></li>
              </ul>
            </li>
            <li>
              <p className={styles["example-link"]} onClick={() => router.push("/components/controls/inputs")}>Inputs</p>
              <ul>
                <li><p className={styles["example-link"]} onClick={() => router.push("/components/controls/inputs/checkbox")}>Checkbox</p></li>
                <li><p className={styles["example-link"]} onClick={() => router.push("/components/controls/inputs/radiogroup")}>Radiogroup</p></li>
                <li><p className={styles["example-link"]} onClick={() => router.push("/components/controls/inputs/slider")}>Slider</p></li>
                <li><p className={styles["example-link"]} onClick={() => router.push("/components/controls/inputs/switch")}>Switch</p></li>
                <li><p className={styles["example-link"]} onClick={() => router.push("/components/controls/inputs/text")}>Text</p></li>
              </ul>
            </li>
          </ul>
        </li>
        <li><p className={styles["example-link"]} onClick={() => router.push("/components/divider")}>Divider</p></li>
        <li><p className={styles["example-link"]} onClick={() => router.push("/components/header")}>Header</p></li>
        <li><p className={styles["example-link"]} onClick={() => router.push("/components/modal")}>Modal</p></li>
        <li><p className={styles["example-link"]} onClick={() => router.push("/components/page")}>Page</p></li>
        <li><p className={styles["example-link"]} onClick={() => router.push("/components/pagination")}>Pagination</p></li>
        <li><p className={styles["example-link"]} onClick={() => router.push("/components/picker")}>Picker</p>
          <ul>
            <li>Calendar</li>
            <li>Date</li>
          </ul>
        </li>
        <li><p className={styles["example-link"]} onClick={() => router.push("/components/popup")}>PopUp</p></li>
        <li><p className={styles["example-link"]} onClick={() => router.push("/components/sidenav")}>SideNav</p></li>
        <li><p className={styles["example-link"]} onClick={() => router.push("/components/spinner")}>Spinner</p></li>
        <li><p className={styles["example-link"]} onClick={() => router.push("/components/table")}>Table</p></li>
        <li><p className={styles["example-link"]} onClick={() => router.push("/components/toast")}>Toast</p></li>
        <li><p className={styles["example-link"]} onClick={() => router.push("/components/tooltip")}>Tooltip</p></li>
      </ul>
    </PageComponent>
  );
}
