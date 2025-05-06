import Button from '@/ui/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { useCreateTask } from './useCreateTask';
import { CreateTaskFormFields, Member } from './types';
import { useParams } from 'react-router-dom';
import useGetMembers from '../team/useGetMembers';
import Input from '@/ui/Input';
import { ChevronDown } from 'lucide-react';

export default function CreateTaskForm({ onClose }: { onClose?: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskFormFields>();

  const { createTask } = useCreateTask();
  const { orgId, projectId } = useParams();

  const onSubmit: SubmitHandler<CreateTaskFormFields> = (data) => {
    data.organisationId = orgId!;
    data.projectId = projectId!;
    data.position = 0;
    createTask(data);
    console.log(data);
    onClose?.();
  };

  const { members } = useGetMembers(orgId!);

  const inputClassName =
    'w-full rounded-md border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none pr-8';
  const labelClassName = 'text-muted-foreground font-semibold';
  const errorClassName = 'text-red-400 text-sm mt-1';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 md:min-w-[400px] "
    >
      <Input
        id="name"
        type="text"
        label="Task Name"
        error={errors.name?.message}
        {...register('name', {
          required: 'Task name is required',
          minLength: {
            value: 3,
            message: 'Task name must be at least 3 characters',
          },
        })}
      />

      <div className="space-y-1">
        <label htmlFor="status" className={labelClassName}>
          Status
        </label>
        <div className="relative">
          <select
            id="status"
            className={inputClassName}
            {...register('status', { required: 'Status is required' })}
          >
            <option value="BACKLOG">Backlog</option>
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="IN_REVIEW">In Review</option>
            <option value="DONE">Done</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
        {errors.status && (
          <div className={errorClassName}>{errors.status.message}</div>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="assigneeId" className={labelClassName}>
          Assignee
        </label>
        <div className="relative">
          <select
            id="assigneeId"
            className={inputClassName}
            {...register('assigneeId', { required: 'Assignee is required' })}
          >
            {members?.map((member: Member) => (
              <option key={member._id} value={member._id}>
                {member.firstName} {member.lastName}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
        {errors.assigneeId && (
          <div className={errorClassName}>{errors.assigneeId.message}</div>
        )}
      </div>

      <Input
        id="dueDate"
        type="date"
        label="Due Date"
        min={format(new Date(), 'yyyy-MM-dd')}
        {...register('dueDate', { required: 'Due date is required' })}
      />

      <div className="space-y-1">
        <label htmlFor="description" className={labelClassName}>
          Description (Optional)
        </label>
        <textarea
          id="description"
          className={`${inputClassName} min-h-[80px]`}
          {...register('description')}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onClose} type="button">
          Cancel
        </Button>
        <Button type="submit">Create Task</Button>
      </div>
    </form>
  );
}
