import { Input } from "@/components/ui/input";
import { services } from "@/lib/data";
import { ServiceCard } from "@/components/service-card";

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
        <Input
          placeholder="Search for services like 'Sofa Cleaning' or 'Termite Control'..."
          className="h-14 rounded-full bg-background/90 px-6 text-lg backdrop-blur-sm"
        />
      </div>

      <div id="services">
        <section className="mb-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cleaningServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        <section>
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
