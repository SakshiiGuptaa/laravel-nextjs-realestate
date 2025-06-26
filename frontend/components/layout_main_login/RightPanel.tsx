import AuthCard from "../AuthCard";

export default function RightPanel({
  isLogin,
  setIsLogin,
}: {
  isLogin: boolean;
  setIsLogin: (v: boolean) => void;
}) {
  return (
    <div className="w-full lg:w-1/2 flex justify-center items-center px-2 sm:px-6 py-4">
      <AuthCard isLogin={isLogin} setIsLogin={setIsLogin} />
    </div>
  );
}
