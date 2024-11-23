import {
  Dialog,
  DialogBody,
  DialogTitle,
  DialogActions,
} from "../../components/catalyst/dialog";
import { Field, Label } from "../../components/catalyst/fieldset";
import { Input } from "../../components/catalyst/input";
import { Select } from "../../components/catalyst/select";
import { Switch, SwitchField } from "../../components/catalyst/switch";
import { Button } from "../../components/catalyst/button";
import { useForm } from "react-hook-form";
import { JobType } from "../../components/JobCard";

interface JobFormData {
  title: string;
  company: string;
  location: string;
  type: JobType;
  remote: boolean;
  salary: number;
}

interface ICreateJobDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateJobDialog = (props: ICreateJobDialogProps) => {
  const { isOpen, onClose } = props;

  const { register, handleSubmit, reset, watch, setValue } =
    useForm<JobFormData>({
      defaultValues: {
        remote: false,
        type: JobType.FULL_TIME,
      },
    });

  const onSubmit = (data: JobFormData) => {
    console.log(data);
    onClose();
    reset();
  };

  const handleCancel = () => {
    onClose();
    reset();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Create New Job</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogBody>
          <div className="space-y-4">
            <Field>
              <Label>Job Title</Label>
              <Input
                {...register("title", { required: true })}
                placeholder="e.g. Senior Software Engineer"
              />
            </Field>

            <Field>
              <Label>Company</Label>
              <Input
                {...register("company", { required: true })}
                placeholder="e.g. Acme Inc"
              />
            </Field>

            <Field>
              <Label>Location</Label>
              <Input
                {...register("location", { required: true })}
                placeholder="e.g. New York, NY"
              />
            </Field>

            <Field>
              <Label>Job Type</Label>
              <Select {...register("type")}>
                {Object.values(JobType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </Field>

            <SwitchField>
              <Label>Remote Position</Label>
              <Switch
                checked={watch("remote")}
                onChange={(checked) => setValue("remote", checked)}
              />
            </SwitchField>

            <Field>
              <Label>Annual Salary (USD)</Label>
              <Input
                type="number"
                {...register("salary", {
                  required: true,
                  valueAsNumber: true,
                })}
                placeholder="e.g. 120000"
              />
            </Field>
          </div>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit">Create Job</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateJobDialog;
