'use client';
import { useState } from 'react';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { signUp } from '@/lib/authClient';
import { LabelInputContainer } from './signup-form-demo';

const baseSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["landlord", "tenant", "cleaning"]),
});

const landlordSchema = baseSchema.extend({
  propertyCount: z.number().min(1),
  businessName: z.string().min(1),
  propertyTypes: z.array(z.string()).min(1, "Select at least one property type"),
  managementExperience: z.number().min(0),
  acceptsPets: z.boolean(),
});

const tenantSchema = baseSchema.extend({
  preferredLocation: z.string().min(1),
  maxBudget: z.number().min(0),
  desiredMoveInDate: z.date(),
  preferredAmenities: z.array(z.string()),
});

const cleaningSchema = baseSchema.extend({
  yearsOfExperience: z.number().min(0),
  servicesOffered: z.array(z.string()).min(1, "Select at least one service"),
  availability: z.array(z.string()).min(1, "Select at least one day"),
  hasOwnEquipment: z.boolean(),
  certifications: z.array(z.string()),
  hourlyRate: z.number().min(0),
});

type FormData = z.infer<typeof baseSchema> & Partial<z.infer<typeof landlordSchema> & z.infer<typeof tenantSchema> & z.infer<typeof cleaningSchema>>;

export function SignUpForm() {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, watch, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(baseSchema),
  });

  const role = watch('role');

  const onSubmit = async (data:FormData) => {
    if (step === 1) {
      setStep(2);
    } else {
      console.log('Form submitted:', data);
      const res = await signUp.email({
        email: data.email,
        name: data.email.split('@')[0],
        password: data.password,
        role: data.role,
        data: {
          propertyCount: data.propertyCount,
          businessName: data.businessName,
          propertyTypes: data.propertyTypes,
          managementExperience: data.managementExperience,
          acceptsPets: data.acceptsPets,
          preferredLocation: data.preferredLocation,
          maxBudget: data.maxBudget,
          desiredMoveInDate: data.desiredMoveInDate,
          preferredAmenities: data.preferredAmenities,
          yearsOfExperience: data.yearsOfExperience,
          servicesOffered: data.servicesOffered,
          availability: data.availability,
          hasOwnEquipment: data.hasOwnEquipment,
          certifications: data.certifications,
          hourlyRate: data.hourlyRate,
        },
      })
      console.log('Sign up response:', res);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          {step === 1 && (
            <>
              <div className="space-y-4">
                <div>
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                    <LabelInputContainer>
                      <Label htmlFor="firstname">First name</Label>
                      <Input id="firstname" placeholder="Tyler" type="text" />
                    </LabelInputContainer>
                    <LabelInputContainer>
                      <Label htmlFor="lastname">Last name</Label>
                      <Input id="lastname" placeholder="Durden" type="text" />
                    </LabelInputContainer>
                  </div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register('email')} />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" {...register('password')} />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>
                <div>
                  <Label>Role</Label>
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="landlord" id="landlord" />
                          <Label htmlFor="landlord">Landlord</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="tenant" id="tenant" />
                          <Label htmlFor="tenant">Tenant</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cleaning" id="cleaning" />
                          <Label htmlFor="cleaning">Cleaning Personnel</Label>
                        </div>
                      </RadioGroup>
                    )}
                  />
                  {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
                </div>
              </div>
            </>
          )}

          {step === 2 && role === 'landlord' && (
            <>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="propertyCount">Number of Properties</Label>
                  <Input id="propertyCount" type="number" {...register('propertyCount', { valueAsNumber: true })} />
                  {errors.propertyCount && <p className="text-red-500 text-sm mt-1">{errors.propertyCount.message}</p>}
                </div>
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" {...register('businessName')} />
                  {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName.message}</p>}
                </div>
                <div>
                  <Label>Property Types</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Apartment', 'House', 'Condo', 'Townhouse'].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={type} {...register('propertyTypes')} value={type} />
                        <Label htmlFor={type}>{type}</Label>
                      </div>
                    ))}
                  </div>
                  {errors.propertyTypes && <p className="text-red-500 text-sm mt-1">{errors.propertyTypes.message}</p>}
                </div>
                <div>
                  <Label htmlFor="managementExperience">Years of Management Experience</Label>
                  <Input id="managementExperience" type="number" {...register('managementExperience', { valueAsNumber: true })} />
                  {errors.managementExperience && <p className="text-red-500 text-sm mt-1">{errors.managementExperience.message}</p>}
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="acceptsPets" {...register('acceptsPets')} />
                  <Label htmlFor="acceptsPets">Accepts Pets</Label>
                </div>
              </div>
            </>
          )}

          {step === 2 && role === 'tenant' && (
            <>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="preferredLocation">Preferred Location</Label>
                  <Input id="preferredLocation" {...register('preferredLocation')} />
                  {errors.preferredLocation && <p className="text-red-500 text-sm mt-1">{errors.preferredLocation.message}</p>}
                </div>
                <div>
                  <Label htmlFor="maxBudget">Maximum Budget</Label>
                  <Input id="maxBudget" type="number" {...register('maxBudget', { valueAsNumber: true })} />
                  {errors.maxBudget && <p className="text-red-500 text-sm mt-1">{errors.maxBudget.message}</p>}
                </div>
                <div>
                  <Label htmlFor="desiredMoveInDate">Desired Move-in Date</Label>
                  <Input id="desiredMoveInDate" type="date" {...register('desiredMoveInDate', { valueAsDate: true })} />
                  {errors.desiredMoveInDate && <p className="text-red-500 text-sm mt-1">{errors.desiredMoveInDate.message}</p>}
                </div>
                <div>
                  <Label>Preferred Amenities</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Parking', 'Gym', 'Pool', 'Laundry', 'Pet-friendly', 'Balcony'].map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox id={amenity} {...register('preferredAmenities')} value={amenity} />
                        <Label htmlFor={amenity}>{amenity}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 2 && role === 'cleaning' && (
            <>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                  <Input id="yearsOfExperience" type="number" {...register('yearsOfExperience', { valueAsNumber: true })} />
                  {errors.yearsOfExperience && <p className="text-red-500 text-sm mt-1">{errors.yearsOfExperience.message}</p>}
                </div>
                <div>
                  <Label>Services Offered</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {['General Cleaning', 'Deep Cleaning', 'Move-in/Move-out Cleaning', 'Window Cleaning', 'Carpet Cleaning'].map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox id={service} {...register('servicesOffered')} value={service} />
                        <Label htmlFor={service}>{service}</Label>
                      </div>
                    ))}
                  </div>
                  {errors.servicesOffered && <p className="text-red-500 text-sm mt-1">{errors.servicesOffered.message}</p>}
                </div>
                <div>
                  <Label>Availability</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox id={day} {...register('availability')} value={day} />
                        <Label htmlFor={day}>{day}</Label>
                      </div>
                    ))}
                  </div>
                  {errors.availability && <p className="text-red-500 text-sm mt-1">{errors.availability.message}</p>}
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="hasOwnEquipment" {...register('hasOwnEquipment')} />
                  <Label htmlFor="hasOwnEquipment">Has Own Equipment</Label>
                </div>
                <div>
                  <Label htmlFor="certifications">Certifications (comma-separated)</Label>
                  <Textarea id="certifications" {...register('certifications')} />
                </div>
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate</Label>
                  <Input id="hourlyRate" type="number" {...register('hourlyRate', { valueAsNumber: true })} />
                  {errors.hourlyRate && <p className="text-red-500 text-sm mt-1">{errors.hourlyRate.message}</p>}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">{step === 1 ? 'Next' : 'Sign Up'}</Button>
    </form>
  );
}

