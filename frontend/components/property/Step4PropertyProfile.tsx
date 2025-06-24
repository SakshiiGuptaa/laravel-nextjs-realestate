"use client";
import { PropertyFormData } from "@/types/propertyForm";
import { useRef, useState } from "react";

type Step4PropertyProfileProps = {
  data: PropertyFormData;
  setData: React.Dispatch<React.SetStateAction<PropertyFormData>>;
  onNext: () => void;
  onBack: () => void;
};

export default function Step4PropertyProfile({
  data,
  setData,
  onNext,
  onBack,
}: Step4PropertyProfileProps) {
  const [photos, setPhotos] = useState<File[]>(data.photos || []);
  const [videos, setVideos] = useState<File[]>(data.videos || []);

  const galleryPhotoRef = useRef<HTMLInputElement>(null);
  const cameraPhotoRef = useRef<HTMLInputElement>(null);
  const galleryVideoRef = useRef<HTMLInputElement>(null);
  const cameraVideoRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = [...photos, ...Array.from(e.target.files)];
      setPhotos(newPhotos);
      setData((prev) => ({ ...prev, photos: newPhotos }));
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newVideos = [...videos, ...Array.from(e.target.files)];
      setVideos(newVideos);
      setData((prev) => ({ ...prev, videos: newVideos }));
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

      {/* Photos */}
      <div>
        <label className="block font-bold mb-2 text-black">
          Property Photos
        </label>
        <input
          ref={galleryPhotoRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handlePhotoChange}
        />
        <input
          ref={cameraPhotoRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handlePhotoChange}
        />
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => galleryPhotoRef.current?.click()}
            className="px-4 py-2 rounded-full border border-gray-300 text-blue-700 font-medium bg-blue-50 hover:bg-blue-100"
          >
            Upload from Gallery
          </button>
          <button
            type="button"
            onClick={() => cameraPhotoRef.current?.click()}
            className="px-4 py-2 rounded-full border border-gray-300 text-green-700 font-medium bg-green-50 hover:bg-green-100"
          >
            Take Photo
          </button>
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
          {photos.map((file, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(file)}
              alt={`Photo ${idx + 1}`}
              className="w-20 h-20 object-cover rounded-s-md"
            />
          ))}
        </div>
      </div>

      {/* Videos */}
      <div>
        <label className="block font-bold mb-2 text-black">
          Property Videos
        </label>
        <input
          ref={galleryVideoRef}
          type="file"
          accept="video/*"
          multiple
          className="hidden"
          onChange={handleVideoChange}
        />
        <input
          ref={cameraVideoRef}
          type="file"
          accept="video/*"
          capture="environment"
          className="hidden"
          onChange={handleVideoChange}
        />
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => galleryVideoRef.current?.click()}
            className="px-4 py-2 rounded-full border border-gray-300 text-blue-700 font-medium bg-blue-50 hover:bg-blue-100"
          >
            Upload from Gallery
          </button>
          <button
            type="button"
            onClick={() => cameraVideoRef.current?.click()}
            className="px-4 py-2 rounded-full border border-gray-300 text-green-700 font-medium bg-green-50 hover:bg-green-100"
          >
            Record Video
          </button>
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
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

      <button
        type="submit"
        className="mt-6 sm:mt-8 px-6 py-3 sm:px-10 sm:py-4 bg-blue-700 text-white rounded-xl font-bold text-lg sm:text-xl shadow hover:bg-blue-800 transition w-full"
      >
        Continue
      </button>
    </form>
  );
}
