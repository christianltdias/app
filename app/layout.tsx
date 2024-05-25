import Header from "../components/header/header";
import { Lexend } from "next/font/google";
import "../styles/global.sass";
import StoreProvider from "../states/provider";

const lexend = Lexend({
  weight: ["300", "500", "700"],
  style: ["normal"],
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
      <body className={lexend.className}>
        <StoreProvider>
          <Header isLogged />
          {children}
          <div id="modal-root"></div>
          <div id="popup-root"></div>
        </StoreProvider>
      </body>
    </html>
  );
}
