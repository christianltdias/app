"use client";
import { ReactNode } from "react";
import styles from "./pagebutton.module.sass";

type PageButtonProps = {
  children: ReactNode;
};

export default function PageButton({ children }: PageButtonProps) {
  return <>{children}</>;
}

export type { PageButtonProps };
