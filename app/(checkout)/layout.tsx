import { Container, Header } from "@/shared/components/shared";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Pizza Slice | Корзина",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="min-h-screen bg-[#F4F1EE]">
        <Container>
          <Suspense>
            <Header
              hasSearch={false}
              hasCartButton={false}
              className="border-b-gray-200"
            />
          </Suspense>
          {children}
        </Container>
      </main>
    </>
  );
}
