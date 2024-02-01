"use client";

import { ReactNode } from "react";
import BreadCrumb from "../breadcrumb/breadcrumb";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import PageButton, { PageButtonProps } from "../buttons/pagebutton/pagebutton";
import styles from "./page.module.sass";

type Prop = {
  children: ReactNode;
  title: string;
  enableBreadcrumb?: boolean;
  disableBackButton?: boolean;
  buttons?: PageButtonProps[];
};

export default function Page({
  children,
  title,
  enableBreadcrumb = true,
  disableBackButton = false,
  buttons,
}: Prop) {
  const pathNames = usePathname()
    .split("/")
    .filter((path) => path);
  const router = useRouter();

  return (
    <div className={styles.page_container}>
      <div className={styles.page_top}>
        <div className={styles.page_info}>
          {enableBreadcrumb && (
            <div className={styles.page_breadcrumb}>
              <BreadCrumb separator="|" />
            </div>
          )}
          {title != null && (
            <h3 className={styles.page_title}>
              {!disableBackButton && pathNames.length > 0 && (
                <span
                  className={styles.return_icon}
                  onClick={() => router.back()}
                >
                  &#10094;
                </span>
              )}
              {title}
            </h3>
          )}
        </div>
        <div className={styles.page_buttons}>
          {buttons != null &&
            buttons.length > 0 &&
            buttons.map((button, index) => {
              return (
                <PageButton key={`page-button=${index}`}>{button.children}</PageButton>
              );
            })}
        </div>
      </div>
      <div className={styles.page_content}>{children}</div>
    </div>
  );
}
