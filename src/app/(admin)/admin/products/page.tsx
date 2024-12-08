import EmptyList from "@/components/global/empty-list";
import { fetchAdminProducts } from "@/actions/products";
import Link from "next/link";
import { formatCurrency } from "@/lib/format";
import FormContainer from "@/components/form/form-container";
import { IconButton } from "@/components/products/icon-button";
import { deleteProductAction } from "@/actions/products";
import {
  TableRow,
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableCell,
} from "@/components/ui/table";

function DeletProduct({ productId }: { productId: string }) {
  const deleteProduct = deleteProductAction.bind(null, { productId });
  return (
    <FormContainer action={deleteProduct}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
}

export default async function AdminProductsPage() {
  const items = await fetchAdminProducts();

  if (items.length === 0) return <EmptyList />;

  return (
    <section>
      <Table>
        <TableCaption className="capitalize">
          total products : {items.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Comapny</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const { id: productId, name, company, price } = item;
            return (
              <TableRow key={productId}>
                <TableCell>
                  <Link href={`/products/${productId}`}>{name}</Link>
                </TableCell>
                <TableCell>{company}</TableCell>
                <TableCell>{formatCurrency(price)}</TableCell>
                <TableCell className="flex items-center gap-x-2">
                  <Link href={`/admin/products/${productId}/edit`}>
                    <IconButton actionType="edit" />
                  </Link>
                  <DeletProduct productId={productId} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}
