import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

export default function MainSection() {
  return (
    <main className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto px-4 py-16 gap-10 items-center">
      <LeftPanel />
      <RightPanel />
    </main>
  );
}
