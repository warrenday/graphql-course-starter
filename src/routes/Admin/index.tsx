import { IJob } from "../../components/JobCard";
import { JobType } from "../../types/graphql";
import Admin from "./Admin";
import { useAdminQuery } from "./queries.generated";

// Mock data - replace with actual data later
const jobs: IJob[] = [
  {
    id: "1",
    title: "Software Engineer",
    company: { name: "Google" },
    location: "New York, NY",
    createdAt: new Date(),
    type: JobType.FULL_TIME,
    remote: true,
    salary: 120000,
  },
];

const AdminRoute = () => {
  const { data } = useAdminQuery();

  const jobs = data?.me?.ownedJobs ?? [];

  return <Admin jobs={jobs} />;
};

export default AdminRoute;
