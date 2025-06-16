// app/layout.tsx

import "./globals.css";
import PersistentDrawerLayout from "@/components/layout/PersistentDrawerLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulasi Trading Saham",
  description: "Platform simulasi trading saham realtime.",
  keywords: ["trading", "simulasi", "saham", "next.js"],
  authors: [{ name: "An Dev" }],
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  // favicon dan lainnya bisa ditambahkan di public/
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <PersistentDrawerLayout>{children}</PersistentDrawerLayout>
      </body>
    </html>
  );
}
