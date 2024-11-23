import client from "../../client";
import { useDeleteJobMutation } from "./queries.generated";

const useDeleteJob = () => {
  const [deleteJobMutation, { loading }] = useDeleteJobMutation();

  return {
    deleteJob: async (jobId: string) => {
      await deleteJobMutation({
        variables: { input: { id: jobId } },
        onCompleted: () => {
          client.cache.evict({ id: `Job:${jobId}` });
        },
      });
    },
    isLoading: loading,
  };
};

export default useDeleteJob;
