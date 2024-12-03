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
