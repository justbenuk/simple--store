import { createClient } from "@supabase/supabase-js";

const bucket = "simple-store";

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string,
);

export async function uploadImage(image: File) {
  const timeStamp = Date.now();
  const newName = `${timeStamp}-${image.name}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(newName, image, {
      cacheControl: "3600",
    });
  if (!data) throw new Error("Image upload failed");
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
}

export async function deleteImage(url: string) {
  const imageName = url.split("/").pop();
  if (!imageName) throw new Error("Invalid Url");
  return supabase.storage.from(bucket).remove([imageName]);
}
