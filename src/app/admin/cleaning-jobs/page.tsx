'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSession } from '@/lib/authClient'

export default function AdminCleaningJobsPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [jobs, setJobs] = useState([])
  const [cleaners, setCleaners] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const status = session?.session.id ? 'authenticated' : 'unauthenticated'

  useEffect(() => {
    // if (status === 'unauthenticated') {
    //   router.push('/login')
    // } else if (session?.user?.role !== 'admin') {
    //   router.push('/')
    // } else {
      fetchJobs()
      fetchCleaners()
    // }
  }, [status, session, router])

  const fetchJobs = async () => {
    const response = await fetch('/api/admin/cleaning-jobs').then((res) => res.json()).catch((error) => {
      console.error('Error fetching cleaning jobs:', error)
    })

    setJobs(response.data)
  }

  const fetchCleaners = async () => {
    const response = await fetch('/api/admin/cleaners').then((res) => res.json()).catch((error) => {
      console.error('Error fetching cleaners:', error)
    })

    setCleaners(response.data)
  }

  const assignJob = async (jobId, cleanerId) => {
    const response = await fetch(`/api/admin/cleaning-jobs/${jobId}/assign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cleanerId }),
    })

    if (response.ok) {
      fetchJobs()
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Manage Cleaning Jobs</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Apartment</TableHead>
            <TableHead>Requested By</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Scheduled Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs?.map((job) => (
            <TableRow key={job._id}>
              <TableCell>{job.apartment?.title}</TableCell>
              <TableCell>{job.requestedBy?.name}</TableCell>
              <TableCell>{job.status}</TableCell>
              <TableCell>{new Date(job.scheduledDate).toLocaleString()}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setSelectedJob(job)}>
                      Assign
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Assign Cleaner</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      const cleanerId = e.target?.cleaner?.value
                      assignJob(selectedJob?._id, cleanerId)
                    }}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="cleaner" className="text-right">
                            Cleaner
                          </Label>
                          <Select name="cleaner">
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select a cleaner" />
                            </SelectTrigger>
                            <SelectContent>
                              {cleaners?.map((cleaner) => (
                                <SelectItem key={cleaner?._id} value={cleaner?._id}>
                                  {cleaner?.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button type="submit">Assign</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

