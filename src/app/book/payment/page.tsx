"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, Landmark, CircleDollarSign, Smartphone } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const paymentMethods = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "netbanking", label: "Net Banking", icon: Landmark },
  { id: "upi", label: "UPI (Google Pay, PhonePe)", icon: Smartphone },
  { id: "cod", label: "Pay After Service", icon: CircleDollarSign },
];

export default function PaymentPage() {
    const [selectedMethod, setSelectedMethod] = useState("card");

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Payment</CardTitle>
        <CardDescription>
          Choose your preferred payment method to complete the booking.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup defaultValue="card" onValueChange={setSelectedMethod}>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <Label
                key={method.id}
                htmlFor={method.id}
                className={cn(
                  "flex items-center gap-4 rounded-lg border p-4 transition-all cursor-pointer",
                  selectedMethod === method.id ? "border-primary bg-primary/5" : "hover:bg-accent"
                )}
              >
                <RadioGroupItem value={method.id} id={method.id} />
                <method.icon className="h-6 w-6 text-primary" />
                <span className="font-semibold">{method.label}</span>
              </Label>
            ))}
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-4">
        <div className="flex justify-between rounded-lg bg-secondary p-4">
          <p className="text-lg font-semibold">Total Payable</p>
          <p className="text-2xl font-bold font-headline">₹470.82</p>
        </div>
        <Button size="lg" className="w-full text-lg" asChild>
          <Link href="/book/confirmation/12345">Confirm Booking</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
