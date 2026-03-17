'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Booking } from '@/lib/types'

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-500',
  confirmed: 'bg-green-500/10 text-green-500',
  cancelled: 'bg-red-500/10 text-red-500',
  completed: 'bg-blue-500/10 text-blue-500',
}

export default function BookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const supabase = createClient()

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('bookings').select('*').order('date', { ascending: true })
      if (data) setBookings(data)
    }
    fetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const bookedDates = bookings.map(b => new Date(b.date))
  const selectedDateStr = selectedDate?.toISOString().split('T')[0]
  const dayBookings = bookings.filter(b => b.date === selectedDateStr)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
      {/* Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            modifiers={{ booked: bookedDates }}
            modifiersStyles={{ booked: { fontWeight: 'bold', textDecoration: 'underline' } }}
          />
        </CardContent>
      </Card>

      {/* Bookings for selected date */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedDate ? selectedDate.toLocaleDateString('bg-BG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'Select a date'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {dayBookings.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No bookings for this date
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dayBookings.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="font-medium">{b.time_slot}</TableCell>
                    <TableCell>{b.customer_name}</TableCell>
                    <TableCell className="text-muted-foreground">{b.customer_email || '—'}</TableCell>
                    <TableCell>
                      <Badge className={`text-xs border-0 capitalize ${statusColors[b.status] || ''}`}>{b.status}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">{b.notes || '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
