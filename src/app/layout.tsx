import type { Metadata } from "next";
import Providers from "./providers";
import "../app/globals.css";

export const metadata: Metadata = {
  title: "CCA",
  description: "유학 프로그램",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}