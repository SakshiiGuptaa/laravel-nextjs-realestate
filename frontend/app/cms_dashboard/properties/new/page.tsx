import CmsNav from "@/cms_components/dashboard/cms_nav";
import CmsSidenav from "@/cms_components/dashboard/cms_sidenav";

export default function NewPropertyForm() {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="hidden md:block">
        <CmsSidenav />
      </div>
      <div className="flex flex-col flex-grow">
        <CmsNav />
        <main className="p-6 flex-1 overflow-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">New Property Setup</h2>

          <form className="bg-white p-6 rounded-lg shadow max-w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow-xs focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Elegant Villa" required />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price (₹)</label>
                <input type="number" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow-xs focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="8500000" required />
              </div>

              {/* Area Sqft */}
              <div>
                <label htmlFor="area" className="block mb-2 text-sm font-medium text-gray-900">Area (sqft)</label>
                <input type="number" id="area" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow-xs focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="1500" required />
              </div>

              {/* Bedrooms */}
              <div>
                <label htmlFor="bedrooms" className="block mb-2 text-sm font-medium text-gray-900">Bedrooms</label>
                <input type="number" id="bedrooms" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow-xs focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="3" required />
              </div>

              {/* Bathrooms */}
              <div>
                <label htmlFor="bathrooms" className="block mb-2 text-sm font-medium text-gray-900">Bathrooms</label>
                <input type="number" id="bathrooms" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow-xs focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="2" />
              </div>

              {/* Type of Property */}
              <div>
                <label htmlFor="type_property" className="block mb-2 text-sm font-medium text-gray-900">Type</label>
                <select id="type_property" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow-xs focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option value="">Select</option>
                  <option value="flat">Flat</option>
                  <option value="villa">Villa</option>
                  <option value="plot">Plot</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              {/* Purpose */}
              <div>
                <label htmlFor="purpose" className="block mb-2 text-sm font-medium text-gray-900">Purpose</label>
                <select id="purpose" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow-xs focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option value="">Select</option>
                  <option value="sale">Sale</option>
                  <option value="rent">Rent</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                <select id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow-xs focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option value="">Pending</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Furnished */}
              <div>
                <label htmlFor="furnished" className="block mb-2 text-sm font-medium text-gray-900">Furnishing</label>
                <select id="furnished" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow-xs focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="semi">Semi</option>
                </select>
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">City</label>
                <input type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow-xs focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Mumbai" />
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">Location</label>
                <input type="text" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow-xs focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Andheri East" />
              </div>

              {/* Address */}
              <div className="sm:col-span-2 lg:col-span-4">
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Full Address</label>
                <textarea id="address" rows={2} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow-xs focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Street, Locality, Landmark"></textarea>
              </div>

              {/* Latitude */}
              <div>
                <label htmlFor="latitude" className="block mb-2 text-sm font-medium text-gray-900">Latitude</label>
                <input type="text" id="latitude" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow-xs focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
              </div>

              {/* Longitude */}
              <div>
                <label htmlFor="longitude" className="block mb-2 text-sm font-medium text-gray-900">Longitude</label>
                <input type="text" id="longitude" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow-xs focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
              </div>

              {/* Featured */}
              <div className="flex items-center mt-6">
                <input type="checkbox" id="featured" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500" />
                <label htmlFor="featured" className="ms-2 text-sm font-medium text-gray-900">Mark as Featured</label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
                      <button
                type="submit"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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