import { useState } from "react";
import { JobType } from "../../components/JobCard";

type Job = {
  title: string;
  company: string;
  location: string;
  createdAt: string;
  type: JobType;
  remote: boolean;
  salary: number;
};

const jobs: Job[] = [
  {
    title: "Software Engineer",
    company: "Google",
    location: "New York, NY",
    createdAt: "2021-01-01",
    type: JobType.FULL_TIME,
    remote: true,
    salary: 120000,
  },
  {
    title: "System Engineer",
    company: "Amazon",
    location: "Seattle, WA",
    createdAt: "2021-01-01",
    type: JobType.FULL_TIME,
    remote: false,
    salary: 100000,
  },
  {
    title: "CTO",
    company: "Meta",
    location: "San Francisco, CA",
    createdAt: "2021-01-01",
    type: JobType.FULL_TIME,
    remote: true,
    salary: 200000,
  },
];

const useSearchJobs = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Job[]>(jobs);
  const [isLoading, setIsLoading] = useState(false);

  const filteredResults = results.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase())
  );

  return { search, setSearch, results: filteredResults, isLoading };
};

export default useSearchJobs;
