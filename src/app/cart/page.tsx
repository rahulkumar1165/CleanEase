'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { useCollection, useUser, useFirestore } from '@/firebase';
import { collection, doc, deleteDoc, runTransaction } from 'firebase/firestore';

interface CartItem {
  id: string;
  service_id: string;
  subcategory_id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const CartItemCard = ({ item, onUpdate, onRemove }: { item: CartItem, onUpdate: (id: string, quantity: number) => void, onRemove: (id: string) => void }) => {
  return (
    <Card className="flex items-center p-4 gap-4">
      <div className="relative h-20 w-20 rounded-md overflow-hidden">
        <Image src={item.image} alt={item.title} fill className="object-cover" />
      </div>
      <div className="flex-grow">
        <p className="font-semibold">{item.title}</p>
        <p className="text-primary font-bold">₹{item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => onUpdate(item.id, item.quantity - 1)}>
          <Minus className="h-4 w-4" />
        </Button>
        <span className="font-bold w-6 text-center">{item.quantity}</span>
        <Button variant="outline" size="icon" onClick={() => onUpdate(item.id, item.quantity + 1)}>
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onRemove(item.id)} className="text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};


export default function CartPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();
  
  const [localCart, setLocalCart] = useState<CartItem[]>([]);

  // Firestore cart for logged-in user
  const cartItemsQuery = user && firestore ? collection(firestore, `users/${user.uid}/cart`) : null;
  const { data: firestoreCart, loading: firestoreLoading, error: firestoreError } = useCollection(cartItemsQuery);

  useEffect(() => {
    if (!user && !userLoading) {
      // User is not logged in, load from local storage
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
      setLocalCart(storedCart);
    }
  }, [user, userLoading]);

  const cartItems = user ? firestoreCart : localCart;
  const loading = user ? firestoreLoading : false;
  const error = user ? firestoreError : null;

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 0) return;

    if (user && firestore) {
      // Logged-in user: update Firestore
      const itemRef = doc(firestore, `users/${user.uid}/cart`, itemId);
      try {
        if (newQuantity === 0) {
          await deleteDoc(itemRef);
          toast({ title: "Item removed from cart." });
        } else {
          await runTransaction(firestore, async (transaction) => {
            transaction.update(itemRef, { quantity: newQuantity });
          });
        }
      } catch (e) {
        console.error("Failed to update quantity: ", e);
        toast({ variant: "destructive", title: "Could not update item quantity." });
      }
    } else {
      // Anonymous user: update local storage
      const updatedCart = newQuantity === 0 
        ? localCart.filter(item => item.id !== itemId)
        : localCart.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item);
      
      setLocalCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      if (newQuantity === 0) {
        toast({ title: "Item removed from cart." });
      }
    }
  };

  const removeItem = (itemId: string) => {
    updateQuantity(itemId, 0);
  };
  
  const total = cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  const handleCheckout = () => {
    if (user) {
      router.push('/book/address');
    } else {
      router.push('/login?redirect=/book/address');
    }
  };

  if (userLoading || loading) {
    return (
        <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
            <p>Loading Cart...</p>
        </div>
    )
  }

  if (error) {
    return (
        <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
            <p>Error: {error.message}</p>
        </div>
    )
  }

  return (
    <div className="bg-white">
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft />
          </Button>
          <h1 className="font-bold text-lg ml-4">My Cart</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {cartItems && cartItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <CartItemCard 
                  key={item.id} 
                  item={item as CartItem} 
                  onUpdate={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>

            <div className="md:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & Charges</span>
                    <span>₹{(total * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{(total * 1.05).toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-4">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild>
              <Link href="/">Browse Services</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
