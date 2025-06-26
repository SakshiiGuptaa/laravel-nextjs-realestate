// app/PropertyDetails/[id]/page.tsx
import { notFound } from "next/navigation";
import { PropertyDetails } from "@/types/propertyDetails";

import Navbar from "@/components/Navbar";
import HeadBar from "@/components/layout/HeaderBar";
import PropertyHeader from "@/components/propertyDetail/PropertyHeader";
import PropertyImageGallery from "@/components/propertyDetail/PropertyImageGallery";
import PropertyQuickFacts from "@/components/propertyDetail/PropertyQuickFacts";
import PropertyTrustBanner from "@/components/propertyDetail/PropertyTrustBanner";
import PropertySocietyDetails from "@/components/propertyDetail/PropertySocietyDetails";
import PropertyAmenitiesList from "@/components/propertyDetail/PropertyAmenitiesList";
import PropertyNearbyPlaces from "@/components/propertyDetail/PropertyNearbyPlaces";
import PropertyOwnerDetails from "@/components/propertyDetail/PropertyOwnerDetails";
import PropertyWhyConsiderTags from "@/components/propertyDetail/PropertyWhyConsiderTags";
import PropertyTransactionDetails from "@/components/propertyDetail/PropertyTransactionDetails";
import PropertyAbout from "@/components/propertyDetail/PropertyAbout";
import PropertyFeaturesList from "@/components/propertyDetail/PropertyFeaturesList";
import Footer from "@/components/Footer";

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const data: { property: PropertyDetails } = await res.json();
  const property = data.property;

  // Optional: Ensure image URLs are correct if you're getting file paths from backend
  const images = property.images?.map((img) =>
    img.startsWith("http") ? img : `/storage/${img}`
  ) ?? [];

  return (
    <div className="bg-[#f7f9fa] min-h-screen font-sans flex flex-col">
      {/* Desktop & Tablet Navbar */}
      <div className="hidden md:block">
        <Navbar />
      </div>
      {/* Mobile Navbar */}
      <div className="md:hidden">
        <HeadBar />
      </div>

      <PropertyHeader property={property} />
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 py-8">
          <PropertyImageGallery images={images} />
          <PropertyQuickFacts property={property} />
          <PropertyTrustBanner />
          <PropertySocietyDetails society={property.society} />
          <PropertyAmenitiesList amenities={property.amenities ?? []} />
          <PropertyNearbyPlaces places={property.nearbyPlaces ?? []} />
          <PropertyWhyConsiderTags tags={property.whyConsider ?? []} />
          <PropertyTransactionDetails details={property.transactionDetails} />
          <PropertyAbout about={property.about} />
          <PropertyFeaturesList features={property.features ?? []} />
          <PropertyOwnerDetails owner={property.owner} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
