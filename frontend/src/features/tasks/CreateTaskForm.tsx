import { Button } from '@/components/ui/button';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { format, isBefore } from 'date-fns';
import { useCreateTask } from './useCreateTask';
import { CreateTaskFormFields, Member, statuses } from './types';
import { useParams } from 'react-router-dom';
import useGetMembers from '../team/useGetMembers';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '@/components/ui/date-picker';

export default function CreateTaskForm({ onClose }: { onClose?: () => void }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateTaskFormFields>({
    defaultValues: {
      dueDate: format(new Date(), 'yyyy-MM-dd') as unknown as Date,
    },
  });

  const { createTask } = useCreateTask();
  const { orgId, projectId } = useParams();

  const onSubmit: SubmitHandler<CreateTaskFormFields> = (data) => {
    data.organisationId = orgId!;
    data.projectId = projectId!;
    data.position = 0;
    createTask(data);
    onClose?.();
  };

  const { members } = useGetMembers(orgId!);

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
        <Label htmlFor="status">Status</Label>
        <Controller
          name="status"
          control={control}
          rules={{ required: 'Status is required' }}
          render={({ field }) => (
            <Select {...field} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses?.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.replace('_', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.status && (
          <div className={errorClassName}>{errors.status.message}</div>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="assigneeId">Assignee</Label>
        <Controller
          name="assigneeId"
          control={control}
          rules={{ required: 'Assignee is required' }}
          render={({ field }) => (
            <Select {...field} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Assignee" />
              </SelectTrigger>
              <SelectContent>
                {members?.map((member: Member) => (
                  <SelectItem key={member._id} value={member._id}>
                    <Avatar>
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>
                        {member.firstName.charAt(0)}
                        {member.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {member.firstName} {member.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.assigneeId && (
          <div className={errorClassName}>{errors.assigneeId.message}</div>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="dueDate">Due Date</Label>
        <Controller
          name="dueDate"
          control={control}
          rules={{
            required: 'Due date is required',
            validate: (value) => {
              if (
                value &&
                isBefore(
                  value,
                  new Date(new Date().setDate(new Date().getDate() - 1))
                )
              ) {
                return 'Due date cannot be in the past';
              }
              return true;
            },
          }}
          render={({ field }) => (
            <DatePicker
              className="w-full"
              {...field}
              date={field.value}
              onChange={field.onChange}
              modal={true}
            />
          )}
        />
        {errors.dueDate && (
          <div className={errorClassName}>{errors.dueDate.message}</div>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Description (Optional)</Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              onChange={field.onChange}
              placeholder="Enter description"
            />
          )}
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
