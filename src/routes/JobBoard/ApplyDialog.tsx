import { useState } from "react";
import { Button } from "../../components/catalyst/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "../../components/catalyst/dialog";
import { Label } from "../../components/catalyst/fieldset";
import { Field } from "../../components/catalyst/fieldset";
import { Input } from "../../components/catalyst/input";

interface IApplyDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplyDialog = (props: IApplyDialogProps) => {
  const { isOpen, onClose } = props;
  const [email, setEmail] = useState("");

  const handleApply = (email: string) => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Apply for role</DialogTitle>
      <DialogDescription>
        Please enter your email below and we will be in touch shortly.
      </DialogDescription>
      <DialogBody>
        <Field>
          <Label>Email</Label>
          <Input
            name="email"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
      </DialogBody>
      <DialogActions>
        <Button plain onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={() => handleApply(email)}>Apply</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplyDialog;
