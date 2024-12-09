"use server";
import { redirect } from "next/navigation";
import { fetchOrCreateCart } from "./cart-actions";
import { getAdminUser, getAuthUser, renderError } from "./user-actions";
import db from "@/lib/db";

export async function createOrder(prevState: any, formData: FormData) {
  const user = await getAuthUser();

  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    const order = await db.order.create({
      data: {
        clerkId: user.id,
        products: cart.numItemsInCart,
        orderTotal: cart.orderTotal,
        tax: cart.tax,
        shipping: cart.shipping,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    await db.cart.delete({
      where: {
        id: cart.id,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect("/orders");
}

export async function fetchUserOrders() {
  const user = await getAuthUser();
  const orders = await db.order.findMany({
    where: {
      clerkId: user.id,
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return orders;
}

export async function fetchAdminOrders() {
  const user = await getAdminUser();

  const orders = db.order.findMany({
    where: {
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return orders;
}
