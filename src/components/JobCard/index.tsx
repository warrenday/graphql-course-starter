import formatSalary from "../../helpers/formatSalary";
import { getInitials } from "../../helpers/getInitials";
import timeSinceDate from "../../helpers/timeSinceDate";
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";

export enum JobType {
  FULL_TIME = "FULL_TIME",
  INTERNSHIP = "INTERNSHIP",
  PART_TIME = "PART_TIME",
}

export interface IJob {
  id: string;
  title: string;
  company: { name: string };
  location: string;
  createdAt: Date;
  type: JobType;
  remote: boolean;
  salary: number;
}

interface IJobCardProps extends Omit<IJob, "id"> {
  action: React.ReactNode;
}

const jobTypeMap = {
  [JobType.FULL_TIME]: "Full-Time",
  [JobType.PART_TIME]: "Part-Time",
  [JobType.INTERNSHIP]: "Internship",
};

const JobCard = (props: IJobCardProps) => {
  const { title, company, location, createdAt, type, remote, salary, action } =
    props;

  return (
    <>
      <div className="p-4 border rounded-lg shadow-sm">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-12 h-12" initials={getInitials(title)} />
            <div>
              <Heading level={2}>{title}</Heading>
              <Text className="text-sm text-gray-500 -mt-[2px]">
                {company.name} • {location}
              </Text>
            </div>
          </div>
          <Text>Posted {timeSinceDate(createdAt)}</Text>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Badge color="lime">{jobTypeMap[type]}</Badge>
          <Badge color="purple">{remote ? "Remote" : "In-Person"}</Badge>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1">
            <Heading level={2}>{formatSalary(salary)}</Heading>
            <Text className="text-xs">/yr</Text>
          </div>
          {action}
        </div>
      </div>
    </>
  );
};

export default JobCard;
