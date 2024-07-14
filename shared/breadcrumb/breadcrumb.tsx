"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./breadcrumb.module.sass";
import React from "react";
import Image from "next/image";

type TBreadCrumbProps = {
  separator?: string;
  capitalizeLinks?: boolean;
  homeAsRoot?: boolean;
};

var getHref = (pathNames: string[], index: number): string => `/${pathNames.slice(0, index + 1).join("/")}`;
var getText = (text: string, capitalizeLinks: boolean): string => capitalizeLinks ? text[0].toUpperCase() + text.slice(1, text.length) : text;
var getSeparator = (separator: string): any =>  <span className={styles["separator"]}> {separator} </span>;

export default function BreadCrumb({
  separator = "❯",
  capitalizeLinks = true,
  homeAsRoot = true,
}: TBreadCrumbProps) {
  const pathNames = usePathname()
    .split("/")
    .filter((path) => path);

  return (
    <div className={styles['main-container']}>
      {homeAsRoot && (
        <>
          <Link className={styles["item"]} href={pathNames.length > 0 ? "/" : {}}>
            <Image src="/home.svg" alt="home" width={20} height={20} /> 
            <p>{getText("home", capitalizeLinks)}</p>
          </Link>
          {pathNames.length !== 0 ? getSeparator(separator) : ""}
        </>
      )}
      {pathNames.map((link, index) => {
        if(index === pathNames.length - 1){
          return (<p className={styles["current"]}>{getText(link, capitalizeLinks)}</p>);
        }

        return (
          <>
            <Link className={styles["item"]} href={getHref(pathNames, index)}>
              <p>{getText(link, capitalizeLinks)}</p>
            </Link>
            {getSeparator(separator)}
          </>
        );
      })}
    </div>
  );
}
