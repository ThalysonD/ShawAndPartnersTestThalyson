import dynamic from "next/dynamic";
import LayoutComponent from "@/components/Layout";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import LoadingComponent from "@/components/Loading";
import { Metadata } from "next";

const CsvDataProvider = dynamic(() => import("@/context/CsvContext"), {
  ssr: false,
  loading: () => <LoadingComponent />,
});

export const metadata: Metadata = {
  title: "Shaw and Partners Application",
  description: "Fullstack Application",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <CsvDataProvider>
          <LayoutComponent>{children}</LayoutComponent>
        </CsvDataProvider>
      </body>
    </html>
  );
}
