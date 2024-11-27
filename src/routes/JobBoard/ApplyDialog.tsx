import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogActions,
  DialogDescription,
  DialogTitle,
} from "../../components/ui/dialog";
import { useAuth } from "../../providers/AuthProvider";

interface IApplyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
}

const ApplyDialog = (props: IApplyDialogProps) => {
  const { isOpen, onClose, jobId } = props;
  const { isLoggedIn } = useAuth();
  const loading = false;

  const handleApply = async () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Apply for role</DialogTitle>
      {isLoggedIn ? (
        <>
          <DialogDescription>
            Confirm you would like to apply for this role.
          </DialogDescription>
          <DialogActions>
            <Button plain onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleApply}>Apply</Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogDescription>
            Please login or create an account to apply for this role.
          </DialogDescription>
          <DialogActions>
            <Button onClick={onClose} loading={loading}>
              Close
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default ApplyDialog;
