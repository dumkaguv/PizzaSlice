import type { Metadata } from "next";

import { Header } from "@/shared/components/shared";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Pizza Slice | Главная",
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main>
      <Suspense>
        <Header />
      </Suspense>

      {children}
      {modal}
    </main>
  );
}
