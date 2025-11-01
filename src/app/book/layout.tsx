import { BookingStepper } from "@/components/booking-stepper";

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <BookingStepper />
      <div className="mt-8">{children}</div>
    </div>
  );
}
