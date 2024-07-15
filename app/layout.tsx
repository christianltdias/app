"use client";

import Header from "../shared/header/header";
import { Noto_Sans } from "next/font/google";
import StoreProvider from "../store/provider";
import Toaster from "../shared/toast/toaster";
import SideNav, { SideNavSection, SideNavSectionType } from "../shared/sidenav/sidenav";
import styles from "./layout.module.sass";
import "../styles/global.sass";
import { useState } from "react";

const noto = Noto_Sans({
  weight: ["300", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sections: SideNavSection[] = [
    {
      title: "pages",
      elements: [
        {
          icon: "/dashboard.svg",
          text: "Dashboard",
          action: () => console.log("dash"),
        },
      ],
    },
    {
      title: "components",
      type: SideNavSectionType.Route,
      elements: [
        {
          icon: "/component.svg",
          text: "Components",
          path: "/components"
        },
      ],
    },
  ];

  const [sideBarExpanded, setSideBarExpanded] = useState<boolean>(true);
  return (
    <html lang="en">
      <body className={noto.className}>
        <StoreProvider>
          <div className={styles["main-container"]}>
            <Header isLogged /> 
            <div className={styles["main"]}>
              <Toaster position="top-right" />
              <SideNav sections={sections} isExpanded={sideBarExpanded} onExpand={setSideBarExpanded}/>
              <div className={styles[`main-content--${sideBarExpanded ? 'expanded' : 'collapsed'}`]}>{children}</div>
            </div>
            <div id="modal-root"></div>
            <div id="popup-root"></div>
            <div id="toaster-root"></div>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
