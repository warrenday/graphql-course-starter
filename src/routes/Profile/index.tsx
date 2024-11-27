import Profile from "./Profile";

const ProfileRoute = () => {
  const { data } = {
    data: {
      me: {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        appliedJobs: [],
      },
    },
  };

  const user = {
    id: data?.me?.id,
    name: data?.me?.name || "",
    email: data?.me?.email || "",
  };

  return <Profile user={user} appliedJobs={data?.me?.appliedJobs || []} />;
};

export default ProfileRoute;
