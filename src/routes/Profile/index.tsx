import { JobType } from "../../components/JobCard";
import Profile from "./Profile";

// Mock data (in a real app, this would come from your backend)
const user = {
  name: "Tom Wilson",
  email: "tom@example.com",
  initials: "TW",
};

const appliedJobs = [
  {
    id: "1",
    title: "Software Engineer",
    company: "Google",
    location: "New York, NY",
    createdAt: "2024-03-01",
    type: JobType.FULL_TIME,
    remote: true,
    salary: 120000,
    icon: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    title: "System Engineer",
    company: "Amazon",
    location: "Seattle, WA",
    createdAt: "2024-03-05",
    type: JobType.FULL_TIME,
    remote: false,
    salary: 100000,
    icon: "https://via.placeholder.com/150",
  },
];

const ProfileRoute = () => {
  return <Profile user={user} appliedJobs={appliedJobs} />;
};

export default ProfileRoute;
