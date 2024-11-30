import { Input } from "../ui/input";
export default function NavSearch() {
  return (
    <>
      <Input
        type="search"
        placeholder="Search Product"
        className="max-w-xs dark:bg-muted"
      />
    </>
  );
}
