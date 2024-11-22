import { JobType } from "../../components/JobCard";
import Admin from "./Admin";

// Mock data - replace with actual data later
const jobs = [
  {
    title: "Software Engineer",
    company: "Google",
    location: "New York, NY",
    createdAt: new Date().toISOString(),
    type: JobType.FULL_TIME,
    remote: true,
    salary: 120000,
    icon: "https://via.placeholder.com/150",
  },
];

const AdminRoute = () => {
  return <Admin jobs={jobs} />;
};

export default AdminRoute;
