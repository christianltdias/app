"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./breadcrumb.module.sass";
import React from "react";

type TBreadCrumbProps = {
  separator?: string;
  capitalizeLinks?: boolean;
  homeAsRoot?: boolean;
};

var getHref = (pathNames: string[], index: number): string =>
  `/${pathNames.slice(0, index + 1).join("/")}`;

var getText = (text: string, capitalizeLinks: boolean): string =>
  capitalizeLinks ? text[0].toUpperCase() + text.slice(1, text.length) : text;

var getSeparator = (separator: string, isLast: boolean): any => {
  if (isLast) {
    return <></>;
  }

  return <span> {separator} </span>;
};

export default function BreadCrumb({
  separator = "/",
  capitalizeLinks = true,
  homeAsRoot = true,
}: TBreadCrumbProps) {
  const pathNames = usePathname()
    .split("/")
    .filter((path) => path);

  return (
    <div className={styles.main_container}>
      {homeAsRoot && (
        <>
          <Link className={`${styles.item} ${pathNames.length === 0 ? "" : styles.root}`} href={pathNames.length > 0 ? "/" : {}}>
            Home
          </Link>
          {getSeparator(separator, pathNames.length === 0)}
        </>
      )}
      {pathNames.map((link, index) => {
        return (
          <>
            <Link className={styles.item} href={index === pathNames.length - 1 ? {} : getHref(pathNames, index)}>
              {getText(link, capitalizeLinks)}
            </Link>
            {getSeparator(separator, index === pathNames.length - 1)}
          </>
        );
      })}
    </div>
  );
}
