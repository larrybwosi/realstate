import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (session?.session.id) {
    return NextResponse.json(
      { message: "Unauthenticated" },
      { status: 405 }
    );
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

