import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

export default function MainSection({
  isLogin,
  setIsLogin,
}: {
  isLogin: boolean;
  setIsLogin: (v: boolean) => void;
}) {
  return (
    <main className="flex flex-col lg:flex-row w-full min-h-screen px-2 sm:px-4 lg:px-20 py-8 sm:py-16 gap-8 lg:gap-16 items-stretch">
      <LeftPanel />
      <RightPanel isLogin={isLogin} setIsLogin={setIsLogin} />
    </main>
  );
}
