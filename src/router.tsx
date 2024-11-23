import { createBrowserRouter } from "react-router-dom";
import Layout from "./containers/Layout";
import JobBoardRoute from "./routes/JobBoard";
import ProfileRoute from "./routes/Profile";
import AdminRoute from "./routes/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <JobBoardRoute />,
      },
      {
        path: "/profile",
        element: <ProfileRoute />,
      },
      {
        path: "/admin",
        element: <AdminRoute />,
      },
    ],
  },
]);

export default router;
