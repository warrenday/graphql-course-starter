import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { StackedLayout } from "../components/ui/stacked-layout";
import { useAuth } from "../providers/AuthProvider";
import { UserRole } from "../types/graphql";
import { getInitials } from "../helpers/getInitials";

const Layout = () => {
  const { isLoggedIn, user, signup, login, logout } = useAuth();

  return (
    <StackedLayout
      navbar={
        <Header
          initials={getInitials(user?.name || "")}
          isLoggedIn={isLoggedIn}
          isAdmin={user?.role === UserRole.ADMIN}
          onSignup={signup}
          onLogin={login}
          onLogout={logout}
        />
      }
      sidebar={null}
    >
      <main>
        <Outlet />
      </main>
    </StackedLayout>
  );
};

export default Layout;
