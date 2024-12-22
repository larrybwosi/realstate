import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
  }

  try {
    const body = await req.json()
    const result = await client.create({
      _type: 'booking',
      ...body,
      status: 'pending',
    })

    return NextResponse.json({ message: 'Booking created successfully', result }, { status: 201 })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json({ message: 'Error creating booking' }, { status: 500 })
  }
}

