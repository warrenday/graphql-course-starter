import { useEffect, useState } from "react";
import {
  JobCreatedSubscription,
  useJobCreatedSubscription,
} from "./queries.generated";
import CreatedJobList from "../../components/CreatedJobList";

type CreatedJob = JobCreatedSubscription["jobCreated"];

const JobCreatedNotification = () => {
  const { data } = useJobCreatedSubscription();
  const [newJobs, setNewJobs] = useState<CreatedJob[]>([]);

  useEffect(() => {
    if (data?.jobCreated) {
      setNewJobs((prev) => [...prev, data.jobCreated]);
    }
  }, [data]);

  return <CreatedJobList jobs={newJobs} />;
};

export default JobCreatedNotification;
