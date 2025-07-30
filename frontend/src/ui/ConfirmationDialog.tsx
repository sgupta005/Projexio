import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from './LoadingSpinner';
import useResize from '@/hooks/useResize';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

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
    <div className="flex gap-3 justify-end">
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
    </div>
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
  const { isMobile } = useResize();

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent className="px-6 pb-4">
          <DrawerHeader>
            <DrawerTitle>Confirm Deletion</DrawerTitle>
            <DrawerDescription>
              <p>
                {`Are you sure you want to delete ${resourceType} `}
                <span className="text-sm text-red-600 font-medium">
                  {resourceName}
                </span>{' '}
                ?
              </p>
              <p className="text-sm text-red-600 font-medium">
                This action cannot be undone.
              </p>
            </DrawerDescription>
          </DrawerHeader>
          <ConfirmationDialogWindow
            resourceType={resourceType}
            resourceName={resourceName}
            onConfirm={onConfirm}
            isLoading={isLoading}
          />
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            <p>
              {`Are you sure you want to delete ${resourceType} `}
              <span className="text-sm text-red-600 font-medium">
                {resourceName}
              </span>{' '}
              ?
            </p>
            <p className="text-sm text-red-600 font-medium">
              This action cannot be undone.
            </p>
          </DialogDescription>
        </DialogHeader>
        <ConfirmationDialogWindow
          resourceType={resourceType}
          resourceName={resourceName}
          onConfirm={onConfirm}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmationDialog;
