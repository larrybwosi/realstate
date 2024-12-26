'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { differenceInDays, format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
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
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { getApartment } from '@/actions'

const formSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  depositAmount: z.number().min(100),
})

export default function BookingPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [apartment, setApartment] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useState(() => {
    const fetchApartment = async () => {
      const res = await getApartment(params.slug)
      setApartment(res.data)
      setIsLoading(false)
    }
    fetchApartment()
  }, [use(params.slug)])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
      depositAmount: 100,
    },
  })

  const { watch } = form
  const startDate = watch('startDate')
  const endDate = watch('endDate')

  const calculateTotalPrice = () => {
    if (!startDate || !endDate || !apartment) return 0
    const days = differenceInDays(endDate, startDate)
    return days * apartment.price
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('/api/book-apartment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apartmentId: apartment._id,
          ...values,
          totalPrice: calculateTotalPrice(),
        }),
      })

      if (response.ok) {
        toast({
          title: 'Booking successful',
          description: 'Your apartment has been booked successfully.',
        })
        router.push('/bookings')
      } else {
        throw new Error('Failed to book apartment')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to book apartment. Please try again.',
        variant: 'destructive',
      })
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (!apartment) return <div>Apartment not found</div>

  return (
    <div className="container mx-auto py-24">
      <h1 className="text-4xl font-bold mb-8">Book {apartment.title}</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <img
            src={apartment.images[0].asset.url}
            alt={apartment.title}
            className="w-full h-64 object-cover rounded-lg"
          />
          <h2 className="text-2xl font-semibold mt-4">${apartment.price}/month</h2>
          <p className="text-muted-foreground">{apartment.description}</p>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date > new Date(apartment.availableDate)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date <= startDate}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="depositAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deposit Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>Minimum deposit is $100</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-xl font-semibold">
                Total Price: ${calculateTotalPrice()}
              </div>
              <Button type="submit">Book Now</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

