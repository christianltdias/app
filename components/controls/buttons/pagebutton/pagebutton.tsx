"use client";
import { ReactNode } from "react";
import styles from './pagebutton.module.sass'

type PageButtonProps = {
  children: ReactNode;
};

export default function PageButton({ children }: PageButtonProps) {
  return <div className={styles['container']}>{children}</div>;
}

export type { PageButtonProps };
