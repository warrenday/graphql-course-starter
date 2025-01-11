import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogBody, DialogTitle } from "./ui/dialog";
import { Text } from "./ui/text";

interface IFloatingJobCounterProps {
  jobs: {
    id: string;
    title: string;
  }[];
}

const FloatingJobCounter = ({ jobs }: IFloatingJobCounterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {jobs.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="rounded-full shadow-lg"
            color="red"
          >
            {jobs.length} New {jobs.length === 1 ? "Job" : "Jobs"}
          </Button>
        </div>
      )}

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>All Jobs ({jobs.length})</DialogTitle>
        <DialogBody>
          <div className="flex flex-col gap-2">
            {jobs.map((job) => (
              <button
                key={job.id}
                className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                <Text>{job.title}</Text>
              </button>
            ))}
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default FloatingJobCounter;
