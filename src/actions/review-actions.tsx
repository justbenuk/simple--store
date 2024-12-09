"use server";
import db from "@/lib/db";
import { getAuthUser } from "./user-actions";
import { reviewSchema, validateWithZodSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { renderError } from "./user-actions";
import { getAuth } from "@clerk/nextjs/server";
export async function createReviewAction(prevState: any, formData: FormData) {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);
    const validatedfields = validateWithZodSchema(reviewSchema, rawData);

    await db.review.create({
      data: {
        ...validatedfields,
        clerkId: user.id,
      },
    });
    revalidatePath(`/products/${validatedfields.productId}`);
    return { message: "Review Added" };
  } catch (error) {
    console.log(error);
    return renderError(error);
  }
}

export async function fetchProductReviews(productId: string) {
  const reviews = await db.review.findMany({
    where: {
      productId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reviews;
}
export async function fetchProductReviewsByUser() {
  const user = await getAuthUser();
  const reviews = await db.review.findMany({
    where: {
      clerkId: user.id,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      product: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });
  return reviews;
}
export async function deleteProductReview(prevState: { reviewId: string }) {
  const { reviewId } = prevState;
  const user = await getAuthUser();

  try {
    await db.review.delete({
      where: {
        id: reviewId,
        clerkId: user.id,
      },
    });
    revalidatePath("/reviews");
  } catch (error) {
    return renderError(error);
  }
}
export async function findExistingReview(userId: string, productId: string) {
  return db.review.findFirst({
    where: {
      clerkId: userId,
      productId,
    },
  });
}

export async function fetchProductRating(productId: string) {
  const result = await db.review.groupBy({
    by: ["productId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      productId,
    },
  });
  return {
    rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
    count: result[0]?._count.rating ?? 0,
  };
}
