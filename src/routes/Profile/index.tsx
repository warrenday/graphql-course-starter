import Profile from "./Profile";
import { useProfileQuery } from "./queries.generated";

const ProfileRoute = () => {
  const { data } = useProfileQuery();

  const user = {
    id: data?.me?.id,
    name: data?.me?.name || "",
    email: data?.me?.email || "",
  };

  return <Profile user={user} appliedJobs={data?.me?.appliedJobs || []} />;
};

export default ProfileRoute;
