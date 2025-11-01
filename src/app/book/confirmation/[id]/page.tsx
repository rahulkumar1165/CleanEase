import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CheckCircle, Calendar, MapPin, CreditCard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ConfirmationPage({ params }: { params: { id: string } }) {
  const confirmationImage = PlaceHolderImages.find(
    (img) => img.id === "booking-confirmation"
  );
  return (
    <div className="flex flex-col items-center text-center">
      <Card className="w-full max-w-2xl overflow-hidden shadow-lg">
        <CardHeader className="bg-primary/5 p-8">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h1 className="mt-4 text-3xl font-bold font-headline">
                Your service is booked!
            </h1>
            <p className="text-muted-foreground">
                Booking ID: <span className="font-mono text-foreground">CLEAN-{params.id}</span>
            </p>
        </CardHeader>
        <CardContent className="p-6 text-left">
            <div className="relative mb-6 h-48 w-full overflow-hidden rounded-lg">
                {confirmationImage && (
                    <Image
                        src={confirmationImage.imageUrl}
                        alt={confirmationImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={confirmationImage.imageHint}
                    />
                )}
            </div>

            <h3 className="font-semibold">Booking Summary</h3>
            <Separator className="my-3"/>
            <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                    <p className="font-medium text-muted-foreground flex items-center gap-2"><Calendar className="h-4 w-4"/>Date & Time</p>
                    <p className="font-semibold">{new Date().toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}, Morning (8AM-12PM)</p>
                </div>
                <div className="flex justify-between">
                    <p className="font-medium text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4"/>Address</p>
                    <p className="font-semibold text-right max-w-[60%]">123, Sunshine Apts, Green Valley, Mumbai</p>
                </div>
                <div className="flex justify-between">
                    <p className="font-medium text-muted-foreground flex items-center gap-2"><CreditCard className="h-4 w-4"/>Payment</p>
                    <p className="font-semibold">₹470.82 (Credit Card)</p>
                </div>
            </div>
        </CardContent>
      </Card>
      <div className="mt-8 flex gap-4">
        <Button asChild>
            <Link href="/my-bookings">View Booking</Link>
        </Button>
        <Button variant="outline" asChild>
            <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
