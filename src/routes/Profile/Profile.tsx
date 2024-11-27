import { useState } from "react";
import {
  Alert,
  AlertActions,
  AlertDescription,
  AlertTitle,
} from "../../components/ui/alert";
import { Avatar } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import {
  DescriptionList,
  DescriptionTerm,
  DescriptionDetails,
} from "../../components/ui/description-list";
import { Heading } from "../../components/ui/heading";
import { Text } from "../../components/ui/text";
import JobCard, { IJob } from "../../components/JobCard";
import useCancelApplication from "./useCancelApplication";
import EmptyState from "../../components/EmptyState";
import { getInitials } from "../../helpers/getInitials";

interface IUser {
  name: string;
  email: string;
}

interface IProfileProps {
  user: IUser;
  appliedJobs: IJob[];
}

const Profile = (props: IProfileProps) => {
  const { user, appliedJobs } = props;
  const [cancelJobId, setCancelJobId] = useState<string | null>(null);
  const { cancelApplication, isLoading } = useCancelApplication();

  return (
    <div className="flex flex-col gap-8">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        <Avatar
          initials={getInitials(user.name)}
          className="size-16 bg-black text-white text-xl"
        />
        <div>
          <Heading level={1}>{user.name}</Heading>
          <Text className="text-zinc-500">{user.email}</Text>
        </div>
      </div>

      {/* Profile Details */}
      <div>
        <Heading level={2} className="mb-4">
          Profile Details
        </Heading>
        <DescriptionList>
          <DescriptionTerm>Full Name</DescriptionTerm>
          <DescriptionDetails>{user.name}</DescriptionDetails>

          <DescriptionTerm>Email</DescriptionTerm>
          <DescriptionDetails>{user.email}</DescriptionDetails>
        </DescriptionList>
      </div>

      {/* Applications */}
      <Alert open={!!cancelJobId} onClose={() => setCancelJobId(null)}>
        <AlertTitle>Cancel Application</AlertTitle>
        <AlertDescription>
          Are you sure you want to cancel your application? This action cannot
          be undone.
        </AlertDescription>
        <AlertActions>
          <Button plain onClick={() => setCancelJobId(null)}>
            No, keep application
          </Button>
          <Button
            color="red"
            onClick={async () => {
              await cancelApplication(cancelJobId!);
              setCancelJobId(null);
            }}
            loading={isLoading}
          >
            Yes, cancel application
          </Button>
        </AlertActions>
      </Alert>

      <div>
        <Heading level={2} className="mb-4">
          Applications
        </Heading>
        {appliedJobs.length === 0 && (
          <EmptyState
            title="No applications found"
            description="Apply for a job to get started"
          />
        )}
        <div className="flex flex-col gap-4">
          {appliedJobs.map((job, index) => (
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
                <Button onClick={() => setCancelJobId(job.id)}>Cancel</Button>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
