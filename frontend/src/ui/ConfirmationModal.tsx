import Modal from './Modal';
import Button from './Button';
import SpinnerMini from './SpinnerMini';

interface ConfirmationModalProps {
  resourceType: string;
  resourceName: string;
  onConfirm: () => void;
  isLoading?: boolean;
  children: React.ReactElement;
}

interface ConfirmationModalWindowProps {
  resourceType: string;
  resourceName: string;
  onConfirm: () => void;
  isLoading?: boolean;
  onClose?: () => void;
}

function ConfirmationModalWindow({
  resourceType,
  resourceName,
  onConfirm,
  isLoading = false,
  onClose,
}: ConfirmationModalWindowProps) {
  function handleConfirm() {
    onConfirm();
    // Don't close modal here - let the parent handle it based on success/error
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">
          Confirm Deletion
        </h2>
        <p className=" text-gray-600">
          {`Are you sure you want to delete ${resourceType} `}
          <span className="text-sm text-red-600 font-medium">
            {resourceName}
          </span>{' '}
          ?
        </p>
        <p className="text-sm text-red-600 font-medium">
          This action cannot be undone.
        </p>
      </div>

      <div className="flex gap-3 justify-end">
        <Button variant="outline" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={handleConfirm}
          disabled={isLoading}
          className="min-w-[80px]"
        >
          {isLoading ? <SpinnerMini className="h-4 w-4" /> : 'Delete'}
        </Button>
      </div>
    </div>
  );
}

/**
 * Confirmation Modal Component
 *
 * @example
 * ```tsx
 * <ConfirmationModal
 *   resourceType="Organisation"
 *   resourceName={currentOrganisation.name}
 *   onConfirm={handleDelete}
 *   isLoading={isDeleting}
 * >
 *     <Button variant="danger">Delete Organisation</Button>
 * </ConfirmationModal>
 * ```
 */
function ConfirmationModal({
  resourceType,
  resourceName,
  onConfirm,
  isLoading = false,
  children,
}: ConfirmationModalProps) {
  return (
    <Modal>
      <Modal.Open opens="delete-confirmation">{children}</Modal.Open>
      <Modal.Window name="delete-confirmation">
        <ConfirmationModalWindow
          resourceType={resourceType}
          resourceName={resourceName}
          onConfirm={onConfirm}
          isLoading={isLoading}
        />
      </Modal.Window>
    </Modal>
  );
}

export default ConfirmationModal;
