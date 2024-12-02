type NavLinksProps = {
  href: string;
  label: string;
};

export const NavLinks: NavLinksProps[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
];

export const LoggedInLinks: NavLinksProps[] = [
  { href: "/favorites", label: "Favorites" },
  { href: "/cart", label: "Cart" },
  { href: "/orders", label: "Orders" },
  { href: "/admin/sales", label: "Dashboard" },
];

export const AdminLinks: NavLinksProps[] = [
  { href: "/admin/sales", label: "Sales" },
  { href: "/admin/products", label: "My Products" },
  { href: "/admin/products/create", label: "Create Product" },
];
