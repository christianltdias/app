import Header from "../components/header/header";
import { Noto_Sans } from "next/font/google";
import "../styles/global.sass";
import StoreProvider from "../states/provider";

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
          {children}
          <div id="modal-root"></div>
          <div id="popup-root"></div>
        </StoreProvider>
      </body>
    </html>
  );
}
