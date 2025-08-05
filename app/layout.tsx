import { APP_THEME_COLOR } from "@/config/app";
import "@/styles/globals.scss";
import ContextProvider from "@/context";
import { headers } from "next/headers";
import { Metadata } from "next";
import { Header } from "./(components)/header";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Chronos - Automated Task Scheduler | Helios",
  description:
    "Manage and monitor your automated tasks (crons) on the Helios blockchain. Schedule smart contract executions, track performance, and optimize your DeFi strategies.",
  keywords: [
    "Helios",
    "blockchain",
    "automation",
    "cron",
    "smart contracts",
    "DeFi",
  ],
  authors: [{ name: "Chronos Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: APP_THEME_COLOR,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = (await headers()).get("cookie");

  return (
    <html lang="en" dir="ltr">
      <body style={{ paddingTop: 60 }}>
        <ContextProvider cookies={cookies}>
          <Header />
          <main style={{ padding: "24px" }}>{children}</main>
          <Toaster
            position="bottom-right"
            richColors
            closeButton
            theme="dark"
          />
        </ContextProvider>
      </body>
    </html>
  );
}
