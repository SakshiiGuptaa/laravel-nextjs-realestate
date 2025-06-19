import HeaderBar from "@/components/layout/HeaderBar";
import MainSection from "@/components/layout/MainSection";

export default function PropertyRegistrationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top header */}
      <HeaderBar />
      {/* Main content: left info + right form */}
      <MainSection />
      {/* Toast notifications */}
    </div>
  );
}
