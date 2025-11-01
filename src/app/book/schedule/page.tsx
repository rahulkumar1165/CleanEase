"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Clock, Sun, Sunset, Cloudy } from "lucide-react"

const timeSlots = [
  { id: "morning", label: "Morning", time: "8 AM – 12 PM", icon: Sun },
  { id: "afternoon", label: "Afternoon", time: "12 PM – 4 PM", icon: Cloudy },
  { id: "evening", label: "Evening", time: "4 PM – 8 PM", icon: Sunset },
]

export default function SchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedSlot, setSelectedSlot] = useState<string | null>("morning")

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">
          Choose a Date & Time
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex justify-center">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1))}
            />
        </div>
        <div className="space-y-6">
            <h3 className="font-semibold text-lg flex items-center gap-2"><Clock className="h-5 w-5"/> Available Time Slots</h3>
            <div className="space-y-3">
                {timeSlots.map((slot) => (
                    <button 
                        key={slot.id} 
                        onClick={() => setSelectedSlot(slot.id)}
                        className={cn(
                            "w-full text-left border p-4 rounded-lg flex items-center gap-4 transition-all",
                            selectedSlot === slot.id ? "bg-primary text-primary-foreground border-primary" : "hover:bg-accent"
                        )}
                    >
                        <slot.icon className={cn("h-8 w-8", selectedSlot === slot.id ? "text-primary-foreground" : "text-primary")} />
                        <div>
                            <p className="font-semibold text-md">{slot.label}</p>
                            <p className={cn("text-sm", selectedSlot === slot.id ? "text-primary-foreground/80" : "text-muted-foreground")}>{slot.time}</p>
                        </div>
                    </button>
                ))}
            </div>
            <div className="flex justify-end pt-4">
                <Button asChild size="lg" disabled={!date || !selectedSlot}>
                    <Link href="/book/review">Continue</Link>
                </Button>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}
