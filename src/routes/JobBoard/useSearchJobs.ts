import { useState } from "react";

const useSearchJobs = () => {
  const [search, setSearch] = useState("");

  // TODO
  const results: any[] = [];
  const loading = false;

  return { search, setSearch, results, isLoading: loading };
};

export default useSearchJobs;
