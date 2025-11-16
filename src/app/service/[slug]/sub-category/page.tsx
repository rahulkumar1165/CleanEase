
'use client';

import { services, subCategories, type SubCategory } from '@/lib/data';
import { notFound, useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ShoppingCart, Star, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import {
  doc,
  setDoc,
  getDoc,
  increment,
  Firestore
} from 'firebase/firestore';

import { useFirebase } from '@/firebase';
import { useUser } from '@/firebase';


const SubCategoryCard = ({
  serviceId,
  subCategory,
}: {
  serviceId: string;
  subCategory: SubCategory;
}) => {
  const { toast } = useToast();
  const { firestore } = useFirebase();
  const { user } = useUser();

  const handleAddToCart = async () => {
    if (!user || !firestore) {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "You must be logged in to add items to the cart.",
        });
        return;
    }

    const cartItemRef = doc(firestore, `users/${user.uid}/cart`, subCategory.id);

    try {
        const docSnap = await getDoc(cartItemRef);

        if (docSnap.exists()) {
            await setDoc(cartItemRef, { quantity: increment(1) }, { merge: true });
        } else {
            await setDoc(cartItemRef, {
                service_id: serviceId,
                subcategory_id: subCategory.id,
                title: subCategory.title,
                price: subCategory.price,
                image: subCategory.image,
                quantity: 1,
            });
        }

        toast({
            title: 'Added to Cart',
            description: `${subCategory.title} has been added to your cart.`,
        });
    } catch (error) {
        console.error("Error adding to cart: ", error);
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Could not add item to cart. Please try again.",
        });
    }
  };

  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="relative h-40 w-full">
          <Image
            src={subCategory.image}
            alt={subCategory.title}
            fill
            className="object-cover"
            data-ai-hint={subCategory.image_hint}
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-base mb-2">{subCategory.title}</h3>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{subCategory.rating}</span>
            </div>
            <p className="font-semibold">₹{subCategory.price}</p>
          </div>
          <Button
            size="sm"
            className="w-full mt-4 rounded-full"
            onClick={handleAddToCart}
          >
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};


export default function SubCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const service = services.find((s) => s.id === slug);
  const relevantSubCategories = subCategories.filter(
    (sc) => sc.parentService === slug
  );

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-white">
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft />
          </Button>
          <h1 className="font-bold text-lg">{service.name}</h1>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart />
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {relevantSubCategories.map((subCategory) => (
            <SubCategoryCard
              key={subCategory.id}
              serviceId={service.id}
              subCategory={subCategory}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
