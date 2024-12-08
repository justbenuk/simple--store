import { z, ZodSchema } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: "name must be at least 2 characters",
    })
    .max(100, { message: "must be less then 100 characters" }),
  company: z.string().min(4),
  price: z.coerce
    .number()
    .int()
    .min(0, { message: "proce ,ust be a posative number" }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "description must be between 10 and 1000 words",
    },
  ),
  featured: z.coerce.boolean(),
});

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown,
): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(","));
  }
  return result.data;
}

//validat image file
function validateImageFile() {
  const maxUploadSize = 1024 * 1024;
  const acceptedFileTypes = ["image/"];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, `File must be less then 1mb`)
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, `File must be an image`);
}
export const imageSchema = z.object({
  image: validateImageFile(),
});

export const reviewSchema = z.object({
  productId: z.string().refine((value) => value !== "", {
    message: "Product Id must not be empty",
  }),
  authorName: z.string().refine((value) => value !== "", {
    message: "Author can not be empty",
  }),
  authorImageUrl: z.string().refine((value) => value !== "", {
    message: "Author must have an image",
  }),
  rating: z.coerce
    .number()
    .int()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be at most 5" }),
  comment: z
    .string()
    .min(10, { message: "comment must be at least 10 characters long" })
    .max(1000, { message: "comment can be no more than 1000 characters" }),
});
