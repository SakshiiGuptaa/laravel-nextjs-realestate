"use client";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import axios from "axios";
import React from "react";

// Import your theme components
import ModernTheme from "@/components/dealer/themes/ModernTheme";
import LuxuryTheme from "@/components/dealer/themes/LuxuryTheme";
import MinimalTheme from "@/components/dealer/themes/MinimalTheme";
import PremiumTheme from "@/components/dealer/themes/PremiumTheme";

const themeComponents: Record<string, any> = {
  modern: ModernTheme,
  luxury: LuxuryTheme,
  minimal: MinimalTheme,
  premium: PremiumTheme,
};

export default function DealerSitePage({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = React.use(params);

  const [website, setWebsite] = useState<any>(null);
  const [dealer, setDealer] = useState<any>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDealerData() {
      try {
        console.log("Fetching dealer data for subdomain:", subdomain);
        console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

        // ✅ CORRECT - Remove the extra /api
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/dealer-site/${subdomain}`
        );

        console.log("API Response:", res.data);

        setWebsite(res.data.website);
        setDealer(res.data.dealer);
        setProperties(res.data.properties || []);
      } catch (error) {
        console.error("Error fetching dealer data:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    }
    fetchDealerData();
  }, [subdomain]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!website || !dealer) {
    return notFound();
  }

  // Pick the correct theme component
  const ThemeComponent = themeComponents[website.theme_id] || ModernTheme;

  return (
    <ThemeComponent
      branding={website.branding}
      domain={{
        subdomain: website.subdomain,
        customDomain: website.custom_domain,
        useCustomDomain: website.use_custom_domain,
      }}
      dealer={dealer}
      properties={properties}
    />
  );
}
