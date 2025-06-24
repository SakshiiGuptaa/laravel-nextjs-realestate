/**
 * ViewNumberModal component
 * Shows a modal with the property phone number.
 * Props:
 * - isOpen: boolean (required)
 * - onClose: function (required)
 * - phoneNumber: string (required)
 */
export default function ViewNumberModal({
  isOpen,
  onClose,
  phoneNumber,
}: {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber: string;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-80">
        <h2 className="text-lg font-bold mb-2">Contact Number</h2>
        <div className="text-blue-700 text-xl font-semibold mb-4">
          {phoneNumber}
        </div>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
