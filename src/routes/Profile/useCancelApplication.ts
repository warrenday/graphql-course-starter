import { useCancelApplicationMutation } from "./queries.generated";

const useCancelApplication = () => {
  const [cancelApplicationMutation, { loading }] =
    useCancelApplicationMutation();

  return {
    cancelApplication: async (id: string) => {
      await cancelApplicationMutation({
        variables: { input: { id } },
        refetchQueries: ["Profile"],
      });
    },
    isLoading: loading,
  };
};

export default useCancelApplication;
