"use client";
import { useState } from "react";
import SidebarStepper from "./SidebarStepper";
import Step1BasicDetails from "./Step1BasicDetails";
import Step2LocationDetails from "./Step2LocationDetails";
import Step3PropertyProfile from "./Step3PropertyProfile";
import Step4PropertyProfile from "./Step4PropertyProfile";
import Step5PropertyProfile from "./Step5PropertyProfile";
import { PropertyFormData } from "@/types/propertyForm";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { toSnakeCasePayload } from "@/lib/utils";

const initialData: PropertyFormData = {
  listingType: "",
  propertyType: "",
  subType: "",
  city: "",
  bedrooms: "",
  bathrooms: "",
  balconies: "",
  areaType: "",
  areaValue: "",
  areaUnit: "sq.ft",
};

const totalSteps = 5;

export default function PropertyListingWizard() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<PropertyFormData>(initialData);
  const router = useRouter();

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    try {
      const payload = toSnakeCasePayload(formData);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/properties`,
        payload,
        {
          headers: {
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Property submitted successfully!");
      console.log(response.data);

      // Reset form
      setFormData(initialData);
      // router.push("/dashboard"); // or any success page
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 px-2 sm:px-8 py-6 sm:py-12 gap-6 sm:gap-12">
      <SidebarStepper step={step} totalSteps={totalSteps} />
      <main className="flex-1 flex flex-col items-center justify-center py-4 sm:py-12">
        <div className="w-full">
          {step === 1 && (
            <Step1BasicDetails
              data={formData}
              setData={setFormData}
              onNext={nextStep}
            />
          )}
          {step === 2 && (
            <Step2LocationDetails
              data={formData}
              setData={setFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 3 && (
            <Step3PropertyProfile
              data={formData}
              setData={setFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 4 && (
            <Step4PropertyProfile
              data={formData}
              setData={setFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 5 && (
            <Step5PropertyProfile
              data={formData}
              setData={setFormData}
              onNext={handleSubmit}
              onBack={prevStep}
            />
          )}
        </div>
      </main>
    </div>
  );
}
