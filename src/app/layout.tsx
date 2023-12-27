import { Roboto } from "next/font/google";

import { Layout } from "@/components/WagmiLayout";

import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
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
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
