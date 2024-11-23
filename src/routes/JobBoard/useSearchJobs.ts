import { useMemo, useState } from "react";
import { useSearchJobsQuery } from "./queries.generated";

const useSearchJobs = () => {
  const [search, setSearch] = useState("");
  const { data, previousData, loading } = useSearchJobsQuery({
    variables: {
      input: {
        query: search,
      },
    },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true, // This enables access to previousData
  });

  const results = useMemo(() => {
    return data?.searchJobs || previousData?.searchJobs || [];
  }, [data?.searchJobs, previousData?.searchJobs]);

  return { search, setSearch, results, isLoading: loading };
};

export default useSearchJobs;
