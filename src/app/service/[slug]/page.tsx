import { services } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Star } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.id,
  }));
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = services.find((s) => s.id === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        <div className="relative h-96 w-full overflow-hidden rounded-lg md:h-auto">
          <Image
            src={service.image_url}
            alt={service.name}
            fill
            className="object-cover"
            data-ai-hint={service.image_hint}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="font-headline text-3xl font-bold md:text-4xl">
            {service.name}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-foreground">{service.rating}</span>
            </div>
            <span>({(service.reviews / 1000).toFixed(0)}k reviews)</span>
          </div>
          <p className="mt-4 text-lg text-muted-foreground">
            {service.description}
          </p>
          <Card className="mt-6 bg-secondary/50">
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-semibold">What's included</h3>
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <div className="mt-auto pt-8">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Starts at</p>
                <p className="font-headline text-4xl font-bold">
                  ₹{service.base_price}
                </p>
              </div>
              <Button asChild size="lg" className="text-lg">
                <Link href={`/book/address?service=${service.id}`}>Add to Cart</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
