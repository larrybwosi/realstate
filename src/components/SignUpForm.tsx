"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { signUp } from "@/lib/authClient";
import { MotionDiv } from "./motion";

// Base schema for common fields
const baseSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["landlord", "tenant", "cleaning"]),
});

// Schema for landlord-specific fields
const landlordSchema = baseSchema.extend({
  propertyCount: z.number().min(1, "Property count must be at least 1"),
  businessName: z.string().min(1, "Business name is required"),
  propertyTypes: z
    .array(z.string())
    .min(1, "Select at least one property type"),
  managementExperience: z.number().min(0, "Experience cannot be negative"),
  acceptsPets: z.boolean(),
});

// Schema for tenant-specific fields
const tenantSchema = baseSchema.extend({
  preferredLocation: z.string().min(1, "Preferred location is required"),
  maxBudget: z.number().min(0, "Budget cannot be negative"),
  desiredMoveInDate: z.date(),
  preferredAmenities: z.array(z.string()),
});

// Schema for cleaning-specific fields
const cleaningSchema = baseSchema.extend({
  yearsOfExperience: z.number().min(0, "Experience cannot be negative"),
  servicesOffered: z.array(z.string()).min(1, "Select at least one service"),
  availability: z.array(z.string()).min(1, "Select at least one day"),
  hasOwnEquipment: z.boolean(),
  certifications: z.array(z.string()),
  hourlyRate: z.number().min(0, "Hourly rate cannot be negative"),
});

// Combined type for form data
type FormData = z.infer<typeof baseSchema> &
  Partial<
    z.infer<typeof landlordSchema> &
      z.infer<typeof tenantSchema> &
      z.infer<typeof cleaningSchema>
  >;

// Animation variants for form transitions
const formVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export function SignUpForm() {
  const [step, setStep] = useState(1);
  const [selectedSchema, setSelectedSchema] = useState(baseSchema);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(selectedSchema),
  });

  const role = watch("role");

  // Update schema based on step and role
  useEffect(() => {
    if (step === 1) {
      setSelectedSchema(baseSchema);
    } else {
      setSelectedSchema(
        role === "landlord"
          ? landlordSchema
          : role === "tenant"
            ? tenantSchema
            : cleaningSchema
      );
    }
  }, [step, role]);

  // Form submission handler
  const onSubmit = async (data: FormData) => {
    if (step === 1) {
      setStep(2);
    } else {
      console.log("Form submitted:", data);
      // Your submission logic
      await signUp.email({
        email: data.email,
        password: data.password,
        name: data.firstName + " " + data.lastName,
      })

    }
  };

  return (
    <div className="p-2 items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl space-y-6"
      >
        <Card className="relative overflow-hidden shadow-xl dark:shadow-slate-800/30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-10" />
          <CardHeader className="text-center space-y-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-muted-foreground">
              {step === 1
                ? "Basic Information"
                : `Complete your ${role} profile`}
            </p>
          </CardHeader>

          <CardContent className="space-y-2">
            <div>
              {step === 1 ? (
                <MotionDiv
                  key="step1"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-2"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>First Name</Label>
                      <Input {...register("firstName")} className="mt-1" placeholder="John"/>
                      {errors?.firstName && (
                        <FormError message={errors.firstName.message} />
                      )}
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input {...register("lastName")} className="mt-1" placeholder="Doe" />
                      {errors.lastName && (
                        <FormError message={errors.lastName.message} />
                      )}
                    </div>
                  </div>

                  <div>
                    <Label>Email</Label>
                    <Input {...register("email")} className="mt-1" placeholder="m@example.com" />
                    {errors.email && (
                      <FormError message={errors.email.message} />
                    )}
                  </div>

                  <div>
                    <Label>Password</Label>
                    <Input
                      type="password"
                      {...register("password")}
                      className="mt-1"
                      placeholder="•••••••••"
                    />
                    {errors.password && (
                      <FormError message={errors.password.message} />
                    )}
                  </div>

                  <div>
                    <Label>Select Role</Label>
                    <Controller
                      name="role"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2"
                        >
                          <RoleCard value="landlord" label="Landlord" />
                          <RoleCard value="tenant" label="Tenant" />
                          <RoleCard value="cleaning" label="Cleaning Pro" />
                        </RadioGroup>
                      )}
                    />
                    {errors.role && <FormError message={errors.role.message} />}
                  </div>
                </MotionDiv>
              ) : (
                <MotionDiv
                  key="step2"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  {role === "landlord" && (
                    <LandlordForm
                      control={control}
                      errors={errors}
                      register={register}
                    />
                  )}
                  {role === "tenant" && (
                    <TenantForm
                      control={control}
                      errors={errors}
                      register={register}
                    />
                  )}
                  {role === "cleaning" && (
                    <CleaningForm
                      control={control}
                      errors={errors}
                      register={register}
                    />
                  )}
                </MotionDiv>
              )}
            </div>

            <div className="flex justify-between">
              {step > 1 && (
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  variant="ghost"
                  className="hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  ← Back
                </Button>
              )}
              <Button
                type="submit"
                className={cn(
                  "ml-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
                  "text-white shadow-lg hover:shadow-xl transition-all duration-200"
                )}
              >
                {step === 1 ? "Continue →" : "Complete Sign Up"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

// Sub-components
const RoleCard = ({ value, label }: { value: string; label: string }) => (
  <Label className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
    <RadioGroupItem value={value} />
    <span className="font-medium">{label}</span>
  </Label>
);

const FormError = ({ message }: { message?: string }) => (
  <p className="text-red-500 text-sm mt-1">{message}</p>
);

const CheckboxGroup = ({
  label,
  options,
  name,
  control,
  errors,
}: {
  label: string;
  options: string[];
  name: string;
  control: any;
  errors: any;
}) => (
  <div>
    <Label>{label}</Label>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
      {options.map((option: string) => (
        <Controller
          key={option}
          name={name}
          control={control}
          render={({ field }) => (
            <Label className="flex items-center space-x-2 p-2 border rounded-md hover:bg-slate-50 dark:hover:bg-slate-800">
              <Checkbox
                checked={field.value?.includes(option)}
                onCheckedChange={(checked) => {
                  const valueArray = field.value || [];
                  return checked
                    ? field.onChange([...valueArray, option])
                    : field.onChange(
                        valueArray.filter((v: string) => v !== option)
                      );
                }}
              />
              <span>{option}</span>
            </Label>
          )}
        />
      ))}
    </div>
    {errors?.[name] && <FormError message={errors[name].message} />}
  </div>
);

// Role-specific forms
const LandlordForm = ({
  control,
  errors,
  register,
}: {
  control: any;
  errors: any;
  register: any;
}) => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label>Property Count</Label>
        <Input
          type="number"
          min={1}
          max={100}
          placeholder="1-100"
          {...register("propertyCount", { valueAsNumber: true })}
        />
        {errors.propertyCount && (
          <FormError message={errors.propertyCount.message} />
        )}
      </div>
      <div>
        <Label>Business Name</Label>
        <Input {...register("businessName")} placeholder="Business Name" />
        {errors.businessName && (
          <FormError message={errors.businessName.message} />
        )}
      </div>
    </div>

    <CheckboxGroup
      label="Property Types"
      name="propertyTypes"
      control={control}
      errors={errors}
      options={["Apartment", "House", "Condo", "Townhouse"]}
    />

    <div>
      <Label>Management Experience (years)</Label>
      <Input
        type="number"
        min={0}
        max={100}
        placeholder="0-100"
        {...register("managementExperience", { valueAsNumber: true })}
      />
      {errors.managementExperience && (
        <FormError message={errors.managementExperience.message} />
      )}
    </div>

    <div className="flex items-center space-x-2">
      <Checkbox id="acceptsPets" {...register("acceptsPets")} />
      <Label htmlFor="acceptsPets">Accepts Pets</Label>
    </div>
  </>
);

const TenantForm = ({
  control,
  errors,
  register,
}: {
  control: any;
  errors: any;
  register: any;
}) => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label>Preferred Location</Label>
        <Input {...register("preferredLocation")} placeholder="Preferred Location" />
        {errors.preferredLocation && (
          <FormError message={errors.preferredLocation.message} />
        )}
      </div>
      <div>
        <Label>Max Budget ($)</Label>
        <Input
          type="number"
          min={0}
          max={100000}
          placeholder="0-100000"
          {...register("maxBudget", { valueAsNumber: true })}
        />
        {errors.maxBudget && <FormError message={errors.maxBudget.message} />}
      </div>
    </div>

    <div>
      <Label>Desired Move-in Date</Label>
      <Input
        type="date"
        {...register("desiredMoveInDate", { valueAsDate: true })}
      />
      {errors.desiredMoveInDate && (
        <FormError message={errors.desiredMoveInDate.message} />
      )}
    </div>

    <CheckboxGroup
      label="Preferred Amenities"
      name="preferredAmenities"
      control={control}
      options={["Parking", "Gym", "Pool", "Laundry", "Pet-friendly", "Balcony"]}
      errors={errors}
    />
  </>
);

const CleaningForm = ({
  control,
  errors,
  register,
}: {
  control: any;
  errors: any;
  register: any;
}) => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label>Years of Experience</Label>
        <Input
          type="number"
          min={0}
          max={100}
          placeholder="0-100"
          {...register("yearsOfExperience", { valueAsNumber: true })}
        />
        {errors.yearsOfExperience && (
          <FormError message={errors.yearsOfExperience.message} />
        )}
      </div>
      <div>
        <Label>Hourly Rate ($)</Label>
        <Input
          type="number"
          min={0}
          max={100000}
          placeholder="0-100000"
          {...register("hourlyRate", { valueAsNumber: true })}
        />
        {errors.hourlyRate && <FormError message={errors.hourlyRate.message} />}
      </div>
    </div>

    <CheckboxGroup
      label="Services Offered"
      name="servicesOffered"
      control={control}
      errors={errors}
      options={[
        "General Cleaning",
        "Deep Cleaning",
        "Move-in/Move-out",
        "Window Cleaning",
        "Carpet Cleaning",
      ]}
    />

    <CheckboxGroup
      label="Availability"
      name="availability"
      control={control}
      errors={errors}
      options={[
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ]}
    />

    <div className="flex items-center space-x-2">
      <Checkbox id="hasOwnEquipment" {...register("hasOwnEquipment")} />
      <Label htmlFor="hasOwnEquipment">Has Own Equipment</Label>
    </div>

    <div>
      <Label>Certifications</Label>
      <Textarea
        {...register("certifications")}
        placeholder="List certifications (comma separated)"
      />
    </div>
  </>
);
