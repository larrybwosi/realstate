'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ImageIcon, Camera } from 'lucide-react'

const formSchema = z.object({
  mainImage: z.string().min(1, {
    message: "Please select a main image.",
  }),
  images: z.array(z.string()).max(5, {
    message: "You can upload a maximum of 5 additional images.",
  }),
})

export function Images({ onNext, onBack, initialData }: { onNext: (data: any) => void, onBack: () => void, initialData: any }) {
  const [mainImage, setMainImage] = useState<string | null>(initialData?.mainImage || null)
  const [additionalImages, setAdditionalImages] = useState<string[]>(initialData?.images || [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      mainImage: "",
      images: [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onNext(values)
  }

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setMainImage(imageUrl)
      form.setValue('mainImage', imageUrl)
    }
  }

  const handleAdditionalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newImages = files.map(file => URL.createObjectURL(file))
    setAdditionalImages(prev => [...prev, ...newImages].slice(0, 5))
    form.setValue('images', [...form.getValues('images'), ...newImages].slice(0, 5))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="mainImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Image</FormLabel>
              <FormControl>
                <div className="flex flex-col items-center justify-center w-full">
                  {mainImage ? (
                    <div className="relative w-full h-64">
                      <img src={mainImage} alt="Main apartment image" className="w-full h-full object-cover rounded-lg" />
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="absolute bottom-2 right-2"
                        onClick={() => {
                          setMainImage(null)
                          field.onChange('')
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImageIcon className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 800x400px)</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleMainImageUpload}
                        accept="image/*"
                      />
                    </label>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Upload the main image for your apartment listing. This will be the first image potential tenants see.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Images</FormLabel>
              <FormControl>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {additionalImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img src={image} alt={`Apartment image ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="absolute bottom-2 right-2"
                        onClick={() => {
                          const newImages = additionalImages.filter((_, i) => i !== index)
                          setAdditionalImages(newImages)
                          field.onChange(newImages)
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  {additionalImages.length < 5 && (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Camera className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="text-xs text-gray-500">Add Image</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleAdditionalImageUpload}
                        accept="image/*"
                      />
                    </label>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Upload up to 5 additional images of your apartment. Show different rooms and features to give a comprehensive view.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button type="button" onClick={onBack} variant="outline">Back</Button>
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">Submit Listing</Button>
        </div>
      </form>
    </Form>
  )
}

