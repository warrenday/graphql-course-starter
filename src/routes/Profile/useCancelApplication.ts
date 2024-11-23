import client from "../../client";
import { useCancelApplicationMutation } from "./queries.generated";

const useCancelApplication = () => {
  const [cancelApplicationMutation, { loading }] =
    useCancelApplicationMutation();

  return {
    cancelApplication: async (id: string) => {
      await cancelApplicationMutation({
        variables: { input: { id } },
        refetchQueries: ["Profile"],
        onCompleted: () => {
          client.cache.modify({
            id: `Job:${id}`,
            fields: {
              isApplied: () => false,
            },
          });
        },
      });
    },
    isLoading: loading,
  };
};

export default useCancelApplication;
