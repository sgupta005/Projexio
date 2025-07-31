import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from './LoadingSpinner';

interface ConfirmationDialogProps {
  resourceType: string;
  resourceName: string;
  onConfirm: () => void;
  isLoading?: boolean;
  children: React.ReactElement;
}

interface ConfirmationDialogWindowProps {
  resourceType: string;
  resourceName: string;
  onConfirm: () => void;
  isLoading?: boolean;
  onClose?: () => void;
}

function ConfirmationDialogWindow({
  onConfirm,
  isLoading = false,
  onClose,
}: ConfirmationDialogWindowProps) {
  function handleConfirm() {
    onConfirm();
    // Don't close Dialog here - let the parent handle it based on success/error
  }

  return (
    <>
      <Button variant="outline" onClick={onClose} disabled={isLoading}>
        Cancel
      </Button>
      <Button
        variant="destructive"
        onClick={handleConfirm}
        disabled={isLoading}
        className="min-w-[80px]"
      >
        {isLoading ? <LoadingSpinner variant="small" /> : 'Delete'}
      </Button>
    </>
  );
}

/**
 * Confirmation Dialog Component
 *
 * @example
 * ```tsx
 * <ConfirmationDialog
 *   resourceType="Organisation"
 *   resourceName={currentOrganisation.name}
 *   onConfirm={handleDelete}
 *   isLoading={isDeleting}
 * >
 *     <Button variant="danger">Delete Organisation</Button>
 * </ConfirmationDialog>
 * ```
 */
function ConfirmationDialog({
  resourceType,
  resourceName,
  onConfirm,
  isLoading = false,
  children,
}: ConfirmationDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            {`Are you sure you want to delete ${resourceType} `}
            <span className="text-sm text-red-600 font-medium">
              {resourceName}
            </span>
            ?{' '}
            <span className="text-sm text-red-600 font-medium">
              This action cannot be undone.
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <ConfirmationDialogWindow
            resourceType={resourceType}
            resourceName={resourceName}
            onConfirm={onConfirm}
            isLoading={isLoading}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmationDialog;
