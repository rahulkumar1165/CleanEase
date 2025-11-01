import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { services, categories } from "@/lib/data";
import { ServiceCard } from "@/components/service-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const cleaningServices = services.filter(
    (service) => service.category === "Cleaning"
  );
  const pestControlServices = services.filter(
    (service) => service.category === "Pest Control"
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative mx-auto mb-12 max-w-3xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search for services like 'Sofa Cleaning' or 'Termite Control'..."
          className="h-14 rounded-full bg-background/90 pl-12 text-lg backdrop-blur-sm"
        />
      </div>

      <section className="relative mb-12 h-[50vh] min-h-[400px] w-full overflow-hidden rounded-2xl bg-primary text-primary-foreground">
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/50 p-6 text-center">
          <h1 className="font-headline text-4xl font-bold md:text-6xl">
            Your Home, Perfectly Clean.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/90">
            Book professional cleaning and pest control services in minutes.
            Reliable, on-time, and background-verified professionals.
          </p>
          <div className="mt-8 flex gap-4">
            <Button asChild size="lg">
              <Link href="#services">Browse Services</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/book/address">Book Now</Link>
            </Button>
          </div>
        </div>
      </section>

      <div id="services">
        <section className="mb-16">
          <h2 className="mb-6 text-center font-headline text-3xl font-bold md:text-4xl">
            Cleaning Services
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cleaningServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-center font-headline text-3xl font-bold md:text-4xl">
            Pest Control
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pestControlServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
