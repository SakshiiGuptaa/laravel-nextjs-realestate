import { PropertyFormData } from "@/types/propertyForm";
import { useRef, useState } from "react";

type Step4PropertyProfileProps = {
  data: PropertyFormData;
  setData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
  onNext: () => void;
  onBack: () => void;
};

export default function Step4PropertyProfile({
  onNext,
  onBack,
}: Step4PropertyProfileProps) {
  const [photos, setPhotos] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos([...photos, ...Array.from(e.target.files)]);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideos([...videos, ...Array.from(e.target.files)]);
    }
  };

  return (
    <form
      className="bg-white rounded-2xl shadow w-full p-2 sm:p-6 md:p-10 sm:max-w-2xl sm:mx-auto space-y-6 sm:space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      <button
        type="button"
        className="text-blue-700 mb-2 sm:mb-4 text-base sm:text-lg font-semibold"
        onClick={onBack}
      >
        &larr; Back
      </button>
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-black">
        Upload Photos & Videos
      </h2>
      <div>
        <label className="block font-bold mb-2 sm:mb-3 text-base sm:text-lg text-black">
          Property Photos
        </label>
        <div className="flex flex-col gap-2">
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handlePhotoChange}
          />
          <button
            type="button"
            className="px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-gray-300 text-blue-700 text-base sm:text-lg font-medium bg-blue-50 hover:bg-blue-100 transition w-fit"
            onClick={() => photoInputRef.current?.click()}
          >
            Upload Photos
          </button>
          <div className="flex flex-wrap gap-3 mt-2">
            {photos.map((file, idx) => (
              <div
                key={idx}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-50"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Photo ${idx + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <label className="block font-bold mb-2 sm:mb-3 text-base sm:text-lg text-black">
          Property Videos
        </label>
        <div className="flex flex-col gap-2">
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            multiple
            className="hidden"
            onChange={handleVideoChange}
          />
          <button
            type="button"
            className="px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-gray-300 text-blue-700 text-base sm:text-lg font-medium bg-blue-50 hover:bg-blue-100 transition w-fit"
            onClick={() => videoInputRef.current?.click()}
          >
            Upload Videos
          </button>
          <div className="flex flex-wrap gap-3 mt-2">
            {videos.map((file, idx) => (
              <video
                key={idx}
                src={URL.createObjectURL(file)}
                controls
                className="w-28 h-16 sm:w-32 sm:h-20 rounded-lg border border-gray-200 bg-gray-50"
              />
            ))}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 sm:mt-8 px-6 py-3 sm:px-10 sm:py-4 bg-blue-700 text-white rounded-xl font-bold text-lg sm:text-xl shadow hover:bg-blue-800 transition w-full"
      >
        Continue
      </button>
    </form>
  );
}
