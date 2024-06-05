import LoadingComponent from "@/components/Loading";
import dynamic from "next/dynamic";

const MainContent = dynamic(() => import("@/components/Home/MainContent"), {
  ssr: false,
  loading: () => <LoadingComponent />,
});

export default function Home() {
  return (
    <div>
      <MainContent />
    </div>
  );
}
