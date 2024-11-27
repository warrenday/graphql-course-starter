import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import JobCard, { IJob } from "../../components/JobCard";
import {
  Alert,
  AlertActions,
  AlertDescription,
  AlertTitle,
} from "../../components/ui/alert";
import CreateJobDialog from "./CreateJobDialog";
import useDeleteJob from "./useDeleteJob";
import EmptyState from "../../components/EmptyState";

interface IAdminProps {
  jobs: IJob[];
}

const Admin = (props: IAdminProps) => {
  const { jobs } = props;
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState<string | null>(null);
  const { deleteJob, isLoading } = useDeleteJob();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Job Listings</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusIcon className="h-5 w-5" />
          Create Job
        </Button>
      </div>

      <CreateJobDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />

      <Alert open={!!deleteJobId} onClose={() => setDeleteJobId(null)}>
        <AlertTitle>Remove Role</AlertTitle>
        <AlertDescription>
          Are you sure you want to remove this role? This action cannot be
          undone.
        </AlertDescription>
        <AlertActions>
          <Button plain onClick={() => setDeleteJobId(null)}>
            No, keep role
          </Button>
          <Button
            color="red"
            onClick={async () => {
              if (deleteJobId) {
                await deleteJob(deleteJobId);
                setDeleteJobId(null);
              }
            }}
            loading={isLoading}
          >
            Yes, remove role
          </Button>
        </AlertActions>
      </Alert>

      {jobs.length === 0 && (
        <EmptyState
          title="No jobs found"
          description="Create a job to get started"
        />
      )}
      <div className="flex flex-col gap-4">
        {jobs.map((job, index) => (
          <JobCard
            key={index}
            title={job.title}
            company={job.company}
            location={job.location}
            createdAt={job.createdAt}
            type={job.type}
            remote={job.remote}
            salary={job.salary}
            action={
              <div className="flex items-center gap-4">
                <Button onClick={() => setDeleteJobId(job.id)}>Remove</Button>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Admin;
