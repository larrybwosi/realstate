import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (req.method !== 'PATCH') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
  }

  try {
    const { id } = params
    const { status } = await req.json()

    const result = await client
      .patch(id)
      .set({ status })
      .commit()

    return NextResponse.json({ message: 'Booking updated successfully', result })
  } catch (error) {
    console.error('Error updating booking:', error)
    return NextResponse.json({ message: 'Error updating booking' }, { status: 500 })
  }
}

