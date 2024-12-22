import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
  }

  try {
    const body = await req.json()
    const result = await client.create({
      _type: 'apartmentSubmission',
      ...body,
      status: 'pending',
    })

    return NextResponse.json({ message: 'Apartment submitted successfully', result }, { status: 201 })
  } catch (error) {
    console.error('Error submitting apartment:', error)
    return NextResponse.json({ message: 'Error submitting apartment' }, { status: 500 })
  }
}

