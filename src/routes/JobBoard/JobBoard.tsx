import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ApplyDialog from "./ApplyDialog";
import useSearchJobs from "./useSearchJobs";
import { Input } from "../../components/catalyst/input";
import JobCard from "../../components/JobCard";
import { Button } from "../../components/catalyst/button";
import { Spinner } from "../../components/catalyst/spinner";
import EmptyState from "../../components/EmptyState";

const JobBoard = () => {
  const { search, setSearch, results, isLoading } = useSearchJobs();
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);

  return (
    <div className="flex flex-col max-w-3xl mx-auto px-4 gap-8">
      <ApplyDialog
        isOpen={isApplyDialogOpen}
        onClose={() => setIsApplyDialogOpen(false)}
      />

      <div className="w-full">
        <div className="relative w-full">
          <Input
            placeholder="Search"
            className="w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {isLoading ? (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <Spinner className="w-5 h-5" />
            </div>
          ) : (
            <MagnifyingGlassIcon className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
          )}
        </div>
      </div>

      {results.length === 0 && (
        <EmptyState
          title="No jobs found"
          description="Try searching for something else"
        />
      )}
      <div className="flex flex-col gap-4">
        {results.map((job) => (
          <JobCard
            key={job.id}
            icon="https://via.placeholder.com/150"
            title={job.title}
            company={job.company.name}
            location={job.location}
            createdAt={job.createdAt}
            type={job.type}
            remote={job.remote}
            salary={job.salary}
            action={
              <Button onClick={() => setIsApplyDialogOpen(true)}>Apply</Button>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default JobBoard;
