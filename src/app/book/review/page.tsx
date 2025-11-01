import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { services } from "@/lib/data"
import { Home, Calendar, MapPin, Pencil } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ReviewPage() {
  const service = services.find(s => s.id === 'sofa-carpet-cleaning'); // Example service

  if (!service) return null;

  const tax = Math.round(service.base_price * 0.18);
  const total = service.base_price + tax;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Review Your Booking</CardTitle>
        <CardDescription>Please confirm the details below before proceeding to payment.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Service Details */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2"><Home className="h-5 w-5"/> Service Details</h3>
            <div className="flex items-center gap-4 mt-2">
                <div className="relative h-16 w-16 rounded-md overflow-hidden">
                    <Image src={service.image_url} alt={service.name} fill className="object-cover" />
                </div>
                <div>
                    <p className="font-semibold">{service.name}</p>
                    <p className="text-sm text-muted-foreground">Starts at ₹{service.base_price}</p>
                </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/"><Pencil className="h-4 w-4 mr-2" />Edit</Link>
          </Button>
        </div>
        <Separator/>

        {/* Address */}
        <div className="flex items-start justify-between">
            <div>
                <h3 className="font-semibold text-lg flex items-center gap-2"><MapPin className="h-5 w-5"/> Address</h3>
                <p className="mt-2 text-muted-foreground">123, Sunshine Apartments, Green Valley, Mumbai - 400001</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
                <Link href="/book/address"><Pencil className="h-4 w-4 mr-2" />Edit</Link>
            </Button>
        </div>
        <Separator/>

        {/* Schedule */}
        <div className="flex items-start justify-between">
            <div>
                <h3 className="font-semibold text-lg flex items-center gap-2"><Calendar className="h-5 w-5"/> Date & Time</h3>
                <p className="mt-2 text-muted-foreground">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="text-muted-foreground">Morning (8 AM – 12 PM)</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
                <Link href="/book/schedule"><Pencil className="h-4 w-4 mr-2" />Edit</Link>
            </Button>
        </div>
        <Separator/>

        {/* Price Breakdown */}
        <div>
            <h3 className="font-semibold text-lg mb-2">Price Breakdown</h3>
            <div className="space-y-2 text-muted-foreground">
                <div className="flex justify-between">
                    <p>Service Total</p>
                    <p>₹{service.base_price.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                    <p>Taxes (GST 18%)</p>
                    <p>₹{tax.toFixed(2)}</p>
                </div>
                <Separator className="my-2"/>
                <div className="flex justify-between font-bold text-foreground text-lg">
                    <p>Grand Total</p>
                    <p>₹{total.toFixed(2)}</p>
                </div>
            </div>
        </div>

      </CardContent>
      <CardFooter>
        <Button size="lg" className="w-full text-lg" asChild>
          <Link href="/book/payment">Confirm & Proceed to Payment</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
