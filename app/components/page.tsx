"use client";

import { useRouter } from "next/navigation";
import PageComponent from "../../shared/page/page";
import styles from "./page.module.sass";
import { concatStyles } from "../../utils/styles.utils";

export default function Page() {
  const router = useRouter();

  return (
    <PageComponent title="Home">
      <h1>Component List</h1>
      <div className={styles["example-container"]}>
        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() => router.push("/components/badge")}
              >
                Badge
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>
              Badges are small status descriptors for UI elements.
            </h4>
          </div>
        </div>

        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() => router.push("/components/breadcrumb")}
              >
                Breadcrumb
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>
              The Breadcrumb component is a trail of links that shows where the
              user currently is in the navigation structure of the project or
              workflow
            </h4>
          </div>
        </div>

        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() => router.push("/components/calendar")}
              >
                Calendar
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>TO DO</h4>
          </div>
        </div>

        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() => router.push("/components/card")}
              >
                Card
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>
              A Card is used to show content container for text, photos, and
              actions in the context of a single subject.
            </h4>
          </div>
        </div>

        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() => router.push("/components/container")}
              >
                Container
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>TO DO</h4>
          </div>
        </div>

        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() => router.push("/components/controls")}
              >
                Controls
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>TO DO</h4>
          </div>
        </div>

        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() => router.push("/components/divider")}
              >
                Divider
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>TO DO</h4>
          </div>
        </div>

        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() => router.push("/components/header")}
              >
                Header
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>TO DO</h4>
          </div>
        </div>

        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() => router.push("/components/modal")}
              >
                Modal
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>TO DO</h4>
          </div>
        </div>

        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() => router.push("/components/page")}
              >
                Page
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>TO DO</h4>
          </div>
        </div>

        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() => router.push("/components/pagination")}
              >
                Pagination
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>TO DO</h4>
          </div>
        </div>

        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() => router.push("/components/picker")}
              >
                Picker
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>TO DO</h4>
          </div>
        </div>

        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() => router.push("/components/popup")}
              >
                PopUp
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>TO DO</h4>
          </div>
        </div>

        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() => router.push("/components/sidenav")}
              >
                SideNav
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>TO DO</h4>
          </div>
        </div>

        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() => router.push("/components/spinner")}
              >
                Spinner
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>TO DO</h4>
          </div>
        </div>

        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() => router.push("/components/table")}
              >
                Table
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>TO DO</h4>
          </div>
        </div>

        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() => router.push("/components/toast")}
              >
                Toast
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>TO DO</h4>
          </div>
        </div>

        <div className={concatStyles(styles["example"], styles["section"])}>
          <div className={styles["example-info"]}>
            <h3 className={styles["example-title"]}>
              <span
                className={styles["example-link"]}
                onClick={() => router.push("/components/tooltip")}
              >
                Tooltip
              </span>
            </h3>
            <h4 className={styles["example-prop"]}>TO DO</h4>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
