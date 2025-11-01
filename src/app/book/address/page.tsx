import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Home, PlusCircle } from "lucide-react";
import Link from "next/link";

const savedAddresses = [
  {
    id: "1",
    type: "Home",
    address: "123, Sunshine Apartments, Green Valley, Mumbai - 400001",
  },
  {
    id: "2",
    type: "Work",
    address: "456, Corporate Towers, Business Bay, Mumbai - 400051",
  },
];

export default function AddressPage() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">
          Select Delivery Address
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Saved Addresses</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {savedAddresses.map((addr) => (
              <Card key={addr.id} className="flex flex-col">
                <CardContent className="flex flex-1 flex-col p-4">
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    <h4 className="font-semibold">{addr.type}</h4>
                  </div>
                  <p className="mt-2 text-muted-foreground flex-1">{addr.address}</p>
                  <Button variant="outline" className="mt-4 w-full" asChild>
                    <Link href="/book/schedule">Use this address</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        <div>
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Add a New Address
          </h3>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="houseNo">House/Flat No. & Building</Label>
              <Input id="houseNo" placeholder="e.g., A-101, Sunshine Apartments" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="street">Street & Landmark</Label>
              <Input id="street" placeholder="e.g., Near City Park" />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="e.g., Mumbai" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="e.g., Maharashtra" />
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <Button asChild>
                <Link href="/book/schedule">Save and Use Address</Link>
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
