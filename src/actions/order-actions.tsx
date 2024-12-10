"use server";
import { redirect } from "next/navigation";
import { fetchOrCreateCart } from "./cart-actions";
import { getAdminUser, getAuthUser, renderError } from "./user-actions";
import db from "@/lib/db";

export async function createOrder(prevState: any, formData: FormData) {
  const user = await getAuthUser();

  let orderId: null | string = null;
  let cartId: null | string = null;

  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });

    cartId = cart.id;
    await db.order.create({
      data: {
        clerkId: user.id,
        products: cart.numItemsInCart,
        orderTotal: cart.orderTotal,
        tax: cart.tax,
        shipping: cart.shipping,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    const order = await db.cart.delete({
      where: {
        id: cart.id,
      },
    });
    orderId = order.id;
  } catch (error) {
    return renderError(error);
  }
  redirect(`/checkout?orderId=${orderId}&cartId=${cartId}`);
}

export async function fetchUserOrders() {
  const user = await getAuthUser();
  const orders = await db.order.findMany({
    where: {
      clerkId: user.id,
      isPaid: false,
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
