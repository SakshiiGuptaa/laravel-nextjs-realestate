import { PropertyFormData } from "@/types/propertyForm";

// Utility function to concatenate class names
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export const toSnakeCasePayload = (formData: PropertyFormData) => {
  return {
    listing_type: formData.listingType,
    property_type: formData.propertyType,
    sub_type: formData.subType,
    city: formData.city,
    bedrooms: formData.bedrooms,
    bathrooms: formData.bathrooms,
    balconies: formData.balconies,
    area_type: formData.areaType,
    area_value: formData.areaValue,
    area_unit: formData.areaUnit,
  };
};
