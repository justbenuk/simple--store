import { Card, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { formatCurrency } from "@/lib/format";
import { createOrder } from "@/actions/order-actions";
import FormContainer from "../form/form-container";
import FormButton from "../form/form-button";
import { Cart } from "@prisma/client";

export default function CartTotals({ cart }: { cart: Cart }) {
  const { cartTotal, shipping, tax, orderTotal } = cart;
  return (
    <div>
      <Card className="p-8">
        <CarttotalRow label="Subtotal" amount={cartTotal} />
        <CarttotalRow label="Shipping" amount={shipping} />
        <CarttotalRow label="Tax" amount={tax} />
        <CardTitle className="mt-8">
          <CarttotalRow label="Order Total" amount={orderTotal} lastRow />
        </CardTitle>
      </Card>
      {/* @ts-expect-error action error */}
      <FormContainer action={createOrder}>
        <FormButton text="Place Order" className="w-full mt-8" />
      </FormContainer>
    </div>
  );
}

function CarttotalRow({
  label,
  amount,
  lastRow,
}: {
  label: string;
  amount: number;
  lastRow?: boolean;
}) {
  return (
    <>
      <p className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{formatCurrency(amount)}</span>
      </p>
      {lastRow ? null : <Separator className="my-2" />}
    </>
  );
}
