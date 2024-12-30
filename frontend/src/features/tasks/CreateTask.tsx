import Button from '@/ui/Button';
import Modal from '@/ui/Modal';
import { Plus } from 'lucide-react';
import CreateTaskForm from './CreateTaskForm';

function CreateTask() {
  return (
    <Modal>
      <Modal.Open opens="task-form">
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="size-4" />
          Create Task
        </Button>
      </Modal.Open>
      <Modal.Window name="task-form" heading="Create Task">
        <CreateTaskForm />
      </Modal.Window>
    </Modal>
  );
}

export default CreateTask;
