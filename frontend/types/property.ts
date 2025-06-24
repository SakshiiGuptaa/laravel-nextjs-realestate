export type Locality = {
  id: string;
  name: string;
  selected: boolean;
};

export type BhkOption = {
  value: number;
  selected: boolean;
};

export type Filters = {
  localities: Locality[];
  bhk: BhkOption[];
  priceRange: string;
};

export type Property = {
  id: string;
  images: string[];
  isRera?: boolean;
  isZeroBrokerage?: boolean;
  is3D?: boolean;
  isNewBooking?: boolean;
  title: string;
  bhk: number; // UNIFY as number for all files
  location: string;
  price: string;
  price2?: string;
  description?: string;
  builder?: string;
  phoneNumber: string;
};
