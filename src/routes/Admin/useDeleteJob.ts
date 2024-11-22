import { useState } from "react";

const useDeleteJob = () => {
  const [isLoading, setIsLoading] = useState(false);

  return {
    deleteJob: async () => {
      // TODO: Implement
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    },
    isLoading,
  };
};

export default useDeleteJob;
