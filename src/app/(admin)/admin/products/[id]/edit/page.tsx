import {
  fetchAdminProductDetails,
  UpdateProductDetails,
  updateProductImage,
} from "@/actions/products";
import FormContainer from "@/components/form/form-container";
import FormInput from "@/components/form/form-input";
import FormPrice from "@/components/form/form-price";
import FormTextarea from "@/components/form/form-textarea";
import FormButton from "@/components/form/form-button";
import FormCheckbox from "@/components/form/form-checkbox";
import ImageInputContainer from "@/components/product/image-update-container";

type idProps = {
  id: string;
};

export default async function ProductEditPage(props: { params: idProps }) {
  const { id } = props.params;
  const product = await fetchAdminProductDetails(id);
  const { company, name, description, featured, price } = product;

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">update product</h1>
      <div className="border p-8 rounded-md">
        <ImageInputContainer
          action={updateProductImage}
          name={name}
          image={product.image}
          text="update image"
        >
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="url" value={product.image} />
        </ImageInputContainer>
        <FormContainer action={UpdateProductDetails}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <input type="hidden" name="id" value={id} />
            <FormInput
              type="text"
              name="name"
              label="product name"
              defaultValue={name}
            />
            <FormInput
              type="text"
              name="company"
              label="company"
              defaultValue={company}
            />
            <FormPrice defaultValue={price} />
          </div>
          <FormTextarea
            name="description"
            labelText="product description"
            defaultValue={description}
          />
          <div className="mt-6">
            <FormCheckbox
              name="featured"
              label="featured"
              defaultChecked={featured}
            />
          </div>
          <FormButton text="update product" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}
