import { useState } from "react";

const useCancelApplication = () => {
  const [isLoading, setIsLoading] = useState(false);

  return {
    cancelApplication: async () => {
      // TODO: Implement
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    },
    isLoading,
  };
};

export default useCancelApplication;
