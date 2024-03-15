import Header from "../components/header/header";
import { Roboto } from "next/font/google";
import "../styles/global.sass";
import StoreProvider from "../states/provider";

const roboto = Roboto({
  weight: ["400", "700"],
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
      <body className={roboto.className}>
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
