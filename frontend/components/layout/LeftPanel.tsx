// components/layout/LeftPanel.tsx
import Headline from "../ui/Headline";
import Checklist from "../ui/Checklist";
import Illustration from "../ui/Illustration";

export default function LeftPanel() {
  return (
    <div className="w-full lg:w-1/2 space-y-6">
      <Headline />
      <Checklist />
      <Illustration />
    </div>
  );
}
