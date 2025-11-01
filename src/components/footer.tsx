import { Sparkles, Twitter, Facebook, Instagram } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-headline text-lg font-bold">
                CleanEase Pro
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your Home, Perfectly Clean.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/#services" className="text-sm text-muted-foreground hover:text-foreground">Cleaning</Link></li>
              <li><Link href="/#services" className="text-sm text-muted-foreground hover:text-foreground">Pest Control</Link></li>
              <li><Link href="/book/address" className="text-sm text-muted-foreground hover:text-foreground">Book Now</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Press</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground"><Twitter /></Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground"><Facebook /></Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground"><Instagram /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CleanEase Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
