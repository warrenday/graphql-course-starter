import formatSalary from "../../helpers/formatSalary";
import timeSinceDate from "../../helpers/timeSinceDate";
import { Badge } from "../catalyst/badge";
import { Heading } from "../catalyst/heading";
import { Text } from "../catalyst/text";

export enum JobType {
  FULL_TIME = "Full Time",
  PART_TIME = "Part Time",
  REMOTE = "Remote",
}

interface IJobCardProps {
  icon: string;
  title: string;
  company: string;
  location: string;
  createdAt: string;
  type: JobType;
  remote: boolean;
  salary: number;
  action: React.ReactNode;
}

const JobCard = (props: IJobCardProps) => {
  const {
    icon,
    title,
    company,
    location,
    createdAt,
    type,
    remote,
    salary,
    action,
  } = props;

  return (
    <>
      <div className="p-4 border rounded-lg shadow-sm">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <img src={icon} alt={title} className="w-12 h-12 rounded-full" />
            <div>
              <Heading level={2}>{title}</Heading>
              <Text className="text-sm text-gray-500 -mt-[2px]">
                {company} • {location}
              </Text>
            </div>
          </div>
          <Text>Posted {timeSinceDate(createdAt)}</Text>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Badge color="lime">{type}</Badge>
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
