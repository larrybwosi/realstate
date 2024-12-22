'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'

export default function RequestCleaningPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // if (status === 'unauthenticated') {
  //   router.push('/login')
  //   return null
  // }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)

    try {
      const response = await fetch('/api/cleaning-jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Your cleaning request has been submitted.',
        })
        router.push('/dashboard')
      } else {
        throw new Error('Failed to submit request')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit cleaning request. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Request Cleaning Service</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="apartment">Apartment</Label>
          <Select name="apartment" required>
            <SelectTrigger>
              <SelectValue placeholder="Select your apartment" />
            </SelectTrigger>
            <SelectContent>
              {/* {session?.user?.apartments?.map((apartment) => (
                <SelectItem key={apartment._id} value={apartment._id}>
                  {apartment.title}
                </SelectItem>
              ))} */}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="scheduledDate">Preferred Date and Time</Label>
          <Input type="datetime-local" id="scheduledDate" name="scheduledDate" required />
        </div>
        <div>
          <Label htmlFor="duration">Estimated Duration (hours)</Label>
          <Input type="number" id="duration" name="duration" min="1" step="0.5" required />
        </div>
        <div>
          <Label htmlFor="tasks">Tasks (comma-separated)</Label>
          <Input type="text" id="tasks" name="tasks" placeholder="Dusting, Vacuuming, Mopping" required />
        </div>
        <div>
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea id="notes" name="notes" placeholder="Any special instructions or requests" />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit Request'}
        </Button>
      </form>
    </div>
  )
}

