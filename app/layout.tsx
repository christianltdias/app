"use client";

import Header from "../shared/header/header";
import { Noto_Sans } from "next/font/google";
import StoreProvider from "../store/provider";
import "../styles/global.sass";
import "./page.sass"
import Toaster from "../shared/toast/toaster";

const noto = Noto_Sans({
  weight: ["300" , "500" , "600" , "700" , "800" , "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={noto.className}>
        <StoreProvider>
          <Header isLogged />
          <Toaster position="top-right"/>
          {children}
          <div id="modal-root"></div>
          <div id="popup-root"></div>
          <div id="toaster-root"></div>
        </StoreProvider>
      </body>
    </html>
  );
}
