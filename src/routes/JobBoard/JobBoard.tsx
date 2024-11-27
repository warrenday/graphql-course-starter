import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ApplyDialog from "./ApplyDialog";
import useSearchJobs from "./useSearchJobs";
import { Input } from "../../components/ui/input";
import JobCard from "../../components/JobCard";
import { Button } from "../../components/ui/button";
import { Spinner } from "../../components/ui/spinner";
import EmptyState from "../../components/EmptyState";
import { Text } from "../../components/ui/text";

const JobBoard = () => {
  const { search, setSearch, results, isLoading } = useSearchJobs();
  const [applyJobId, setApplyJobId] = useState<string | null>(null);

  return (
    <div className="flex flex-col max-w-3xl mx-auto px-4 gap-8">
      <ApplyDialog
        isOpen={!!applyJobId}
        onClose={() => setApplyJobId(null)}
        jobId={applyJobId!}
      />

      <div className="w-full">
        <div className="relative w-full">
          <Input
            placeholder="Search"
            className="w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
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
            title={job.title}
            company={job.company}
            location={job.location}
            createdAt={job.createdAt}
            type={job.type}
            remote={job.remote}
            salary={job.salary}
            action={
              <div className="flex gap-4 items-center">
                {job.isApplied && (
                  <Text className="text-sm text-blue-400 font-medium">
                    Awaiting response
                  </Text>
                )}
                <Button
                  onClick={() => setApplyJobId(job.id)}
                  disabled={job.isApplied}
                >
                  Apply
                </Button>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default JobBoard;
