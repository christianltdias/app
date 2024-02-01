"use client";
import { ReactNode } from "react";

type PageButtonProps = {
  children: ReactNode;
};

export default function PageButton({ children }: PageButtonProps) {
  return <>{children}</>;
}

export type { PageButtonProps };
