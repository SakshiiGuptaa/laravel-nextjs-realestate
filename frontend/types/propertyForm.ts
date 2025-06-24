export type PropertyFormData = {
  listingType: string;
  propertyType: string;
  subType: string;
  city: string;
  bedrooms: string;
  bathrooms: string;
  balconies: string;
  areaType: string;
  areaValue: string;
  areaUnit: string;
  photos?: File[];     // ✅ newly added
  videos?: File[];     // ✅ newly added
  amenities?: string[]; // ✅ newly added
};
