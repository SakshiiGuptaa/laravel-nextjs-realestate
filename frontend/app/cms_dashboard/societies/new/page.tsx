"use client";
import axios from "axios";
import CmsNav from "@/cms_components/dashboard/cms_nav";
import CmsSidenav from "@/cms_components/dashboard/cms_sidenav";
import { useRef, useState } from "react";

export default function NewSocietyForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ New: States for photos and videos
  const [photos, setPhotos] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);

  // ✅ New: Refs for file inputs
  const galleryPhotoRef = useRef<HTMLInputElement>(null);
  const cameraPhotoRef = useRef<HTMLInputElement>(null);
  const galleryVideoRef = useRef<HTMLInputElement>(null);
  const cameraVideoRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = [...photos, ...Array.from(e.target.files)];
      setPhotos(newPhotos);
      // Optional: Store in your formData if needed
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newVideos = [...videos, ...Array.from(e.target.files)];
      setVideos(newVideos);
      // Optional: Store in your formData if needed
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Build FormData for multipart/form-data
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);

      photos.forEach((photo) => {
        form.append("photos[]", photo);
      });

      videos.forEach((video) => {
        form.append("videos[]", video);
      });

      // Make Axios POST request
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/societies`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // ✅ Include your auth token if needed:
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("✅ Society created:", response.data);
      alert("Society saved successfully!");

      // Optional: reset form states
      setFormData({ name: "", description: "" });
      setPhotos([]);
      setVideos([]);

    } catch (error: any) {
      console.error("❌ Submission error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <CmsNav onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex flex-1">
        <CmsSidenav open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="p-6 flex-1 overflow-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Society</h2>

          <form
            className="bg-white p-6 rounded-lg shadow max-w-full"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block font-bold mb-2 text-black">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow-xs focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Society Name"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block font-bold mb-2 text-black">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow-xs focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Society Description"
                />
              </div>
            </div>

            {/* ✅ New: Photos & Videos Upload Section */}
            <div className="mt-8">
              {/* Photos */}
              <div className="mb-6">
                <label className="block font-bold mb-2 text-black">Society Photos</label>
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

                <div className="flex gap-3 mb-3">
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

                <div className="flex flex-wrap gap-3">
                  {photos.map((file, idx) => (
                    <img
                      key={idx}
                      src={URL.createObjectURL(file)}
                      alt={`Photo ${idx + 1}`}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>

              {/* Videos */}
              <div>
                <label className="block font-bold mb-2 text-black">Society Videos</label>
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

                <div className="flex gap-3 mb-3">
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

                <div className="flex flex-wrap gap-3">
                  {videos.map((file, idx) => (
                    <video
                      key={idx}
                      src={URL.createObjectURL(file)}
                      controls
                      className="w-32 h-20 rounded-lg border border-gray-200 bg-gray-50"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
