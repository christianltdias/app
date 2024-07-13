"use client";

import Header from "../shared/header/header";
import { Noto_Sans } from "next/font/google";
import StoreProvider from "../store/provider";
import Toaster from "../shared/toast/toaster";
import SideNav, { SideNavSection, SideNavSectionType } from "../shared/sidenav/sidenav";
import "../styles/global.sass";
import "./page.sass";

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

  return (
    <html lang="en">
      <body className={noto.className}>
        <StoreProvider>
          <Header isLogged />
          <Toaster position="top-right" />
          <SideNav sections={sections}>{children}</SideNav>
          <div id="modal-root"></div>
          <div id="popup-root"></div>
          <div id="toaster-root"></div>
        </StoreProvider>
      </body>
    </html>
  );
}
