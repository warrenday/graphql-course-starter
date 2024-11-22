import { useState } from "react";
import { useSearchJobsQuery } from "./queries.generated";

const useSearchJobs = () => {
  const [search, setSearch] = useState("");
  const { data, loading } = useSearchJobsQuery({
    variables: {
      input: {
        query: search,
      },
    },
  });

  const filteredResults = data?.searchJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.name.toLowerCase().includes(search.toLowerCase())
  );

  return { search, setSearch, results: filteredResults, isLoading: loading };
};

export default useSearchJobs;
