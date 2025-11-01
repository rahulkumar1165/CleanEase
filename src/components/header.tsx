"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, Sparkles } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "/book/address", label: "Book Now" },
  { href: "/my-bookings", label: "My Bookings" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-bold">CleanEase Pro</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" asChild className="hidden md:inline-flex">
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild className="hidden md:inline-flex">
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-primary" />
                    <span className="font-headline text-lg font-bold">
                      CleanEase Pro
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="rounded-md p-2 text-lg font-medium hover:bg-accent"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 border-t pt-4">
                  <Button asChild className="w-full">
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                  <Button variant="ghost" asChild className="mt-2 w-full">
                    <Link href="/login">Log In</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
