// app/layout.tsx
// "use client";

import "./globals.css";
import PersistentDrawerLayout from "@/components/layout/PersistentDrawerLayout";
import { ReactNode } from "react";

export const metadata = {
  title: "Dashboard App",
  description: "Dashboard dengan sidebar dan header",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PersistentDrawerLayout>{children}</PersistentDrawerLayout>
      </body>
    </html>
  );
}
