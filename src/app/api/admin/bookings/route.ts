import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function GET() {
  try {
    const bookings = await client.fetch(`*[_type == "booking"] {
      _id,
      apartmentId,
      "apartmentTitle": *[_type == "apartment" && _id == ^.apartmentId][0].title,
      startDate,
      endDate,
      depositAmount,
      totalPrice,
      status
    }`)

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json({ message: 'Error fetching bookings' }, { status: 500 })
  }
}

