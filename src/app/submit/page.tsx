"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BasicInfo } from "./steps/basic-info";
import { ApartmentDetails } from "./steps/apartment-details";
import { Amenities } from "./steps/amenities";
import { Images } from "./steps/images";
import { Building2 } from "lucide-react";

const steps = [
  {
    title: "Basic Info",
    component: BasicInfo,
    description: "Start with the essential details about your apartment.",
  },
  {
    title: "Apartment Details",
    component: ApartmentDetails,
    description: "Provide more specific information about your property.",
  },
  {
    title: "Amenities",
    component: Amenities,
    description: "Highlight the features that make your apartment stand out.",
  },
  {
    title: "Images",
    component: Images,
    description: "Upload high-quality photos to showcase your apartment.",
  },
];

export default function SubmitApartmentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Submit the form data
      console.log("Form submitted:", { ...formData, ...data });
      alert("Form submitted successfully!");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="dark:bg-zinc-900 mx-auto py-10 px-2 lg:px-8 min-h-screen flex flex-col justify-center">
      <Card className="w-full max-w-6xl mx-auto shadow-lg dark:bg-zinc-900">
        <CardHeader className="space-y-2">
          <div className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-blue-500 dark:text-blue-400" />
            <CardTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Submit Your Apartment for Review
            </CardTitle>
          </div>
          <CardDescription className="text-zinc-600 dark:text-zinc-400">
            Complete the form below to have your apartment featured on our
            website. Please provide detailed information and high-quality images
            to showcase your property.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          <div className="mb-8">
            <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
              {steps.map((step, index) => (
                <li
                  key={index}
                  className={`flex md:w-full items-center ${index === currentStep ? "text-blue-600 dark:text-blue-500" : ""} ${index < currentStep ? "text-green-600 dark:text-green-500" : ""} after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}
                >
                  <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                    {index < currentStep ? (
                      <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                    ) : (
                      <span
                        className={`mr-2 ${index === currentStep ? "text-blue-600 dark:text-blue-500" : ""}`}
                      >
                        {index + 1}
                      </span>
                    )}
                    {step.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {steps[currentStep].description}
            </p>
          </div>
          <CurrentStepComponent
            onNext={handleNext}
            onBack={handleBack}
            initialData={formData}
          />
        </CardContent>
      </Card>
    </div>
  );
}
