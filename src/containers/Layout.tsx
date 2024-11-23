import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { StackedLayout } from "../components/catalyst/stacked-layout";
import { useAuth } from "../providers/AuthProvider";
import { UserRole } from "../types/graphql";

const Layout = () => {
  const { isLoggedIn, user, signup, login, logout } = useAuth();

  return (
    <StackedLayout
      navbar={
        <Header
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
