// components/layout/LeftPanel.tsx
import Headline from "./Headline";
import Checklist from "./Checklist";
import Illustration from "./Illustration";

export default function LeftPanel() {
  return (
    <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 sm:space-y-8 px-2 sm:px-0 lg:px-0 py-4">
      <Headline />
      <Checklist />
      <Illustration />
    </div>
  );
}
