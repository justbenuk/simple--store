import Container from "../global/container";
import CartButton from "./cart-button";
import DarkMode from "./dark-mode";
import LinksDropdown from "./links-dropdown";
import Logo from "./logo";
import NavSearch from "./nav-search";

export default function Navbar() {
  return (
    <nav className="border-b">
      <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap py-8 gap-4">
        <Logo />
        <NavSearch />
        <div className="flex gap-4 items-center">
          <CartButton />
          <DarkMode />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
}
