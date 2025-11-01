"use client";

import { usePathname } from "next/navigation";
import { Home, MapPin, Calendar, CreditCard, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { name: "Address", href: "/book/address", icon: MapPin },
  { name: "Schedule", href: "/book/schedule", icon: Calendar },
  { name: "Review", href: "/book/review", icon: Home },
  { name: "Payment", href: "/book/payment", icon: CreditCard },
  { name: "Confirmation", href: "/book/confirmation", icon: PartyPopper },
];

export function BookingStepper() {
  const pathname = usePathname();

  const currentStepIndex = steps.findIndex((step) =>
    pathname.startsWith(step.href)
  );

  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="flex items-center"
      >
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={cn("relative", {
              "flex-1": stepIdx < steps.length - 1,
            })}
          >
            <>
              {stepIdx < currentStepIndex ? (
                // Completed step
                <div className="group flex w-full items-center">
                  <span className="flex items-center px-6 py-2 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary">
                      <step.icon
                        className="h-6 w-6 text-primary-foreground"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="ml-4 hidden text-sm font-medium text-foreground md:inline-block">
                      {step.name}
                    </span>
                  </span>
                </div>
              ) : stepIdx === currentStepIndex ? (
                // Current step
                <div
                  className="flex items-center px-6 py-2 text-sm font-medium"
                  aria-current="step"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary">
                    <step.icon
                      className="h-6 w-6 text-primary"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="ml-4 hidden text-sm font-medium text-primary md:inline-block">
                    {step.name}
                  </span>
                </div>
              ) : (
                // Upcoming step
                <div className="group flex w-full items-center">
                  <span className="flex items-center px-6 py-2 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-muted">
                      <step.icon
                        className="h-6 w-6 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="ml-4 hidden text-sm font-medium text-muted-foreground md:inline-block">
                      {step.name}
                    </span>
                  </span>
                </div>
              )}

              {/* Separator */}
              {stepIdx < steps.length - 1 ? (
                 <div
                    className={cn(
                        'absolute inset-0 top-0 left-0 hidden w-3/5 lg:block',
                        { 'lg:w-full': step.name === "Confirmation" }
                    )}
                    aria-hidden="true"
                >
                    <svg
                        className="h-full w-full text-muted"
                        viewBox="0 0 22 80"
                        fill="none"
                        preserveAspectRatio="none"
                    >
                        <path
                        d="M0.5 0H21.5L8.5 40L21.5 80H0.5L13.5 40L0.5 0Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                </div>
              ) : null}
            </>
          </li>
        ))}
      </ol>
    </nav>
  );
}
