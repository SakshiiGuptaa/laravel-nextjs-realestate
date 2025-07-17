import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-6xl mb-4">🏠</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Dealer Website Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The dealer website you are looking for does not exist or has been
          deactivated.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          ← Back to Main Site
        </Link>
      </div>
    </div>
  );
}
