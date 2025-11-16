
"use client"

import * as React from "react"
import { useRouter, useParams, notFound } from 'next/navigation';
import { services } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import Link from "next/link";


const HourToggle = ({
    value,
    selected,
    onClick,
  }: {
    value: number;
    selected: boolean;
    onClick: (value: number) => void;
  }) => (
    <button
      onClick={() => onClick(value)}
      className={cn(
        "h-10 w-10 rounded-full border flex items-center justify-center transition-colors",
        selected
          ? "bg-primary text-primary-foreground border-primary"
          : "hover:bg-accent"
      )}
    >
      {value}
    </button>
  );
  
  const OptionButton = ({
    label,
    selected,
    onClick,
  }: {
    label: string;
    selected: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full border transition-colors",
        selected
          ? "bg-primary text-primary-foreground border-primary"
          : "hover:bg-accent"
      )}
    >
      {label}
    </button>
  );

export default function ServiceOptionsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = services.find((s) => s.id === slug);
  const [hours, setHours] = React.useState(2);
  const [professionals, setProfessionals] = React.useState(1);
  const [needsMaterials, setNeedsMaterials] = React.useState(false);


  if (!service) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-2xl font-bold">{service.name} Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="space-y-4">
                    <Label className="font-semibold text-lg flex items-center gap-2">
                        How many hours do you need your professional to stay?
                        <Info className="h-4 w-4 text-muted-foreground" />
                    </Label>
                    <div className="flex flex-wrap gap-2">
                        {[...Array(8)].map((_, i) => (
                            <HourToggle
                            key={i + 1}
                            value={i + 1}
                            selected={hours === i + 1}
                            onClick={setHours}
                            />
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <Label className="font-semibold text-lg">
                        How many professionals do you need?
                    </Label>
                    <div className="flex flex-wrap gap-2">
                        {[...Array(4)].map((_, i) => (
                            <HourToggle
                            key={i + 1}
                            value={i + 1}
                            selected={professionals === i + 1}
                            onClick={setProfessionals}
                            />
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <Label className="font-semibold text-lg flex items-center gap-2">
                        Need cleaning materials?
                        <Info className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-normal text-muted-foreground ml-auto">Powered by Jif</span>
                    </Label>
                    <div className="flex gap-2">
                        <OptionButton
                            label="No, I have them"
                            selected={!needsMaterials}
                            onClick={() => setNeedsMaterials(false)}
                        />
                        <OptionButton
                            label="Yes, please"
                            selected={needsMaterials}
                            onClick={() => setNeedsMaterials(true)}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <Label htmlFor="instructions" className="font-semibold text-lg">
                        Any instructions or special requirements?
                    </Label>
                    <Textarea id="instructions" placeholder="e.g., 'Please use the side entrance' or 'Focus on the master bedroom closet'." />
                </div>
                 <div className="space-y-4">
                    <h3 className="font-semibold text-lg">What's included</h3>
                    <div className="space-y-3">
                    {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <Checkbox id={`feature-opt-${index}`} defaultChecked />
                            <Label htmlFor={`feature-opt-${index}`} className="font-normal">{feature}</Label>
                        </div>
                    ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end pt-4">
                <Button size="lg" asChild>
                    <Link href={`/book/address`}>Continue</Link>
                </Button>
            </CardFooter>
        </Card>
    </div>
  );
}
