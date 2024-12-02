import CreateProdictForm from "@/forms/create-product-form";
export default async function CreatProductsPage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">create product</h1>
      <div className="border p-8 rounded-md">
        <CreateProdictForm />
      </div>
    </section>
  );
}
