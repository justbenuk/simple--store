import CartItemsList from "@/components/cart/cartitems-list";
import CartTotals from "@/components/cart/cart-totals";
import Sectiontitle from "@/components/global/section-title";
import { fetchOrCreateCart, updateCart } from "@/actions/cart-actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Section } from "lucide-react";

export default async function CartPage() {
  const { userId } = await auth();

  if (!userId) redirect("/");

  const prevcart = await fetchOrCreateCart({ userId });
  const { cartItems, currentCart } = await updateCart(prevcart);

  if (cartItems.length === 0) {
    return <Sectiontitle text="Empty Cart" />;
  }

  return (
    <>
      <Sectiontitle text="Shopping Cart" />
      <div className="mt-8 grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList cartItems={cartItems} />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals cart={currentCart} />
        </div>
      </div>
    </>
  );
}
