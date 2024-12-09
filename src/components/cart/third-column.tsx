"use client";
import { useState } from "react";
import SelectProductAmount from "../product/select-product-amount";
import { Mode } from "../product/select-product-amount";
import FormContainer from "../form/form-container";
import FormButton from "../form/form-button";
import {
  removeCartItemAction,
  updateCartItemAction,
} from "@/actions/cart-actions";
import { useToast } from "@/hooks/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

export default function ThirdColumn({
  quantity,
  id,
}: {
  quantity: number;
  id: string;
}) {
  const [amount, setAmount] = useState(quantity);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  async function handleAmountChange(value: number) {
    setIsLoading(true);
    toast({ description: "Calculating..." });
    const result = await updateCartItemAction({
      amount: value,
      cartItemId: id,
    });
    setAmount(value);
    toast({ description: result.message });
    setIsLoading(false);
  }
  return (
    <div className="md:ml-8">
      <SelectProductAmount
        amount={amount}
        setAmount={handleAmountChange}
        mode={Mode.CartItem}
        isLoading={false}
      />
      <FormContainer action={removeCartItemAction}>
        <input type="hidden" name="id" value={id} />
        <FormButton size="sm" className="mt-4" text="remove" />
      </FormContainer>
    </div>
  );
}
