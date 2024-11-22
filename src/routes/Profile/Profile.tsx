import { useState } from "react";
import {
  Alert,
  AlertActions,
  AlertDescription,
  AlertTitle,
} from "../../components/catalyst/alert";
import { Avatar } from "../../components/catalyst/avatar";
import { Button } from "../../components/catalyst/button";
import {
  DescriptionList,
  DescriptionTerm,
  DescriptionDetails,
} from "../../components/catalyst/description-list";
import { Heading } from "../../components/catalyst/heading";
import { Text } from "../../components/catalyst/text";
import JobCard, { JobType } from "../../components/JobCard";
import useCancelApplication from "./useCancelApplication";
import EmptyState from "../../components/EmptyState";

interface IUser {
  name: string;
  email: string;
  initials: string;
}

interface IJob {
  id: string;
  title: string;
  company: string;
  location: string;
  createdAt: string;
  type: JobType;
  remote: boolean;
  salary: number;
  icon: string;
}

interface IProfileProps {
  user: IUser;
  appliedJobs: IJob[];
}

const Profile = (props: IProfileProps) => {
  const { user, appliedJobs } = props;
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { cancelApplication, isLoading } = useCancelApplication();

  return (
    <div className="flex flex-col gap-8">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        <Avatar
          initials={user.initials}
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
      <Alert open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
        <AlertTitle>Cancel Application</AlertTitle>
        <AlertDescription>
          Are you sure you want to cancel your application? This action cannot
          be undone.
        </AlertDescription>
        <AlertActions>
          <Button plain onClick={() => setIsConfirmOpen(false)}>
            No, keep application
          </Button>
          <Button
            color="red"
            onClick={async () => {
              await cancelApplication();
              setIsConfirmOpen(false);
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
              icon={job.icon}
              title={job.title}
              company={job.company}
              location={job.location}
              createdAt={job.createdAt}
              type={job.type}
              remote={job.remote}
              salary={job.salary}
              action={
                <Button onClick={() => setIsConfirmOpen(true)}>Cancel</Button>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
