import { Outlet } from "react-router-dom";
import Header from "./Header";
import { StackedLayout } from "./catalyst/stacked-layout";

const Layout = () => {
  return (
    <StackedLayout navbar={<Header />} sidebar={null}>
      <main>
        <Outlet />
      </main>
    </StackedLayout>
  );
};

export default Layout;
