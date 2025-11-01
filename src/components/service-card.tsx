import type { Service } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Button } from "./ui/button";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link href={`/service/${service.id}`} className="group block">
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={service.image_url}
              alt={service.name}
              fill
              className="object-cover"
              data-ai-hint={service.image_hint}
            />
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col p-4">
          <h3 className="font-headline text-lg font-semibold">{service.name}</h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{service.rating}</span>
            </div>
            <span>({(service.reviews / 1000).toFixed(0)}k reviews)</span>
          </div>
          <p className="mt-4 flex-1 text-sm text-muted-foreground">{service.description}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <p className="text-lg font-bold">
            <span className="text-sm font-normal text-muted-foreground">Starts at </span>₹{service.base_price}
          </p>
          <Button variant="secondary" className="group-hover:bg-primary group-hover:text-primary-foreground">
            View Details
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
