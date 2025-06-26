export type ReraStatus = {
  isRegistered: boolean;
  registrationNo: string;
  website: string;
};

export type Configuration = {
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  floor: number;
  totalFloors: number;
  propertyAge: string;
};

export type Address = {
  society: string;
  locality: string;
  city: string;
  state: string;
};

export type Society = {
  name: string;
  area: number;
  areaUnit: string;
  towers: number;
  units: number;
  floors: number;
  configuration: string;
  propertyType: string;
  brochureUrl: string;
  developer: string;
  possession: string;
};

export type Amenity =
  | "Power Backup"
  | "Intercom Facility"
  | "Lift(s)"
  | "Water Purifier"
  | "Maintenance Staff"
  | "Swimming Pool"
  | "Park"
  | "Security Personnel"
  | "Airy Rooms"
  | "Shopping Centre"
  | "Pet Friendly"
  | "Parking Available"
  | "Fitness Centre/Gym"
  | "Club/Community Center"
  | "Wheel Chair Friendly"
  | "Rain Water Harvesting"
  | "Gated Society"
  | "On-Call Maintenance Staff";

export type NearbyPlace = {
  name: string;
  type: string;
};

export type TransactionDetails = {
  transactionType: string;
  propertyOwnership: string;
  furnishing: string;
  parking: string;
  gatedCommunity: boolean;
  petFriendly: boolean;
  wheelchairFriendly: boolean;
  powerBackup: string;
  cornerProperty: boolean;
};

export type About = {
  address: string;
  description: string;
};

export type Owner = {
  name: string;
  avatar: string;
  phoneNumber: string;
  propertiesListed: number;
  localities: string[];
};

export type PropertyDetails = {
  id: string;
  title: string;
  price: string;
  pricePerSqft: string;
  bhk: number;
  baths: number;
  area: number;
  areaUnit: string;
  reraStatus: ReraStatus;
  isReadyToMove: boolean;
  images: string[];
  configuration: Configuration;
  address: Address;
  society: Society;
  amenities: Amenity[];
  nearbyPlaces: NearbyPlace[];
  whyConsider: string[];
  transactionDetails: TransactionDetails;
  about: About;
  features: string[];
  owner: Owner;
};
