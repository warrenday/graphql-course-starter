import { Avatar } from "./catalyst/avatar";
import {
  ArrowRightStartOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Logo from "./Logo";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "./catalyst/dropdown";
import { Navbar, NavbarItem, NavbarSection } from "./catalyst/navbar";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header>
      <Navbar className="flex justify-between items-center">
        <Logo />

        <NavbarSection className="max-lg:hidden">
          <NavbarItem href="/" current={currentPath === "/"}>
            Job Search
          </NavbarItem>
          <NavbarItem href="/profile" current={currentPath === "/profile"}>
            Applications
          </NavbarItem>
        </NavbarSection>

        <Dropdown>
          <DropdownButton as={NavbarItem}>
            <Avatar initials="TW" className="bg-black text-white" square />
          </DropdownButton>
          <DropdownMenu className="min-w-64" anchor="bottom end">
            <DropdownItem href="/profile">
              <UserIcon />
              <DropdownLabel>My profile</DropdownLabel>
            </DropdownItem>

            <DropdownDivider />
            <DropdownItem href="/logout">
              <ArrowRightStartOnRectangleIcon />
              <DropdownLabel>Sign out</DropdownLabel>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Navbar>
    </header>
  );
};

export default Header;
