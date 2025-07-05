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
  totalFloors?: string;
  propertyOnFloor?: string;
  availabilityStatus?: string;
  ownership?: string;
  expectedPrice?: string;
  pricePerSqft?: string;
  allInclusive?: boolean;
  taxExcluded?: boolean;
  priceNegotiable?: boolean;
  description?:string;
};