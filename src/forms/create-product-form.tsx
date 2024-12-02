import { createProduct } from "@/actions/products";
import FormContainer from "@/components/form/form-container";
import FormImage from "@/components/form/form-image";
import FormInput from "@/components/form/form-input";
import FormPrice from "@/components/form/form-price";
import FormButton from "@/components/form/form-button";
import FormTextarea from "@/components/form/form-textarea";
import FormCheckbox from "@/components/form/form-checkbox";

export default function CreateProdictForm() {
  return (
    <FormContainer action={createProduct}>
      <div className="grid gap-4 md:grid-cols-2 my-4">
        <FormInput label="product name" type="text" name="name" />
        <FormInput label="company" type="text" name="company" />
        <FormPrice />
        <FormImage />
      </div>
      <FormTextarea name="description" labelText="product description" />
      <div className="mt-6">
        <FormCheckbox name="featured" label="featured" />
      </div>
      <FormButton text="Create Product" className="mt-8" />
    </FormContainer>
  );
}
