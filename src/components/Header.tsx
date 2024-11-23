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
import { Button } from "./catalyst/button";
import LoginAlert from "./LoginAlert";
import { LoginInput, SignupInput } from "../providers/AuthProvider";

interface IHeaderProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  onSignup: (input: SignupInput) => Promise<void>;
  onLogin: (input: LoginInput) => Promise<void>;
  onLogout: () => void;
}

const Header = (props: IHeaderProps) => {
  const { isLoggedIn, isAdmin, onSignup, onLogin, onLogout } = props;
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
          {isAdmin && (
            <NavbarItem href="/admin" current={currentPath === "/admin"}>
              Admin
            </NavbarItem>
          )}
        </NavbarSection>

        {isLoggedIn ? (
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
              <DropdownItem onClick={onLogout}>
                <ArrowRightStartOnRectangleIcon />
                <DropdownLabel>Sign out</DropdownLabel>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <LoginAlert onLogin={onLogin} onSignup={onSignup}>
            <Button>Login</Button>
          </LoginAlert>
        )}
      </Navbar>
    </header>
  );
};

export default Header;
