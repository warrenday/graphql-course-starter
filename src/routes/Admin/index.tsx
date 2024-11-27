import Admin from "./Admin";

const AdminRoute = () => {
  const { data } = {
    data: {
      me: {
        ownedJobs: [],
      },
    },
  };

  const jobs = data?.me?.ownedJobs ?? [];

  return <Admin jobs={jobs} />;
};

export default AdminRoute;
