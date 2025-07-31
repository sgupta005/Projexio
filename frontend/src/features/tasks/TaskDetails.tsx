import { Link, useParams } from 'react-router-dom';
import useGetTask from './useGetTask';
import { LoadingSpinner } from '@/ui/LoadingSpinner';
import { format } from 'date-fns';
import { StatusBadge } from './StatusBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  User,
  FolderOpen,
  FileText,
  Edit,
  Trash2,
  Save,
  X,
  ArrowLeft,
} from 'lucide-react';
import { useDeleteTask } from './useDeleteTask';
import { useUpdateTask } from './useUpdateTask';
import ConfirmationDialog from '@/ui/ConfirmationDialog';
import { useNavigate } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { Controller, useForm } from 'react-hook-form';
import { statuses } from './types';
import useGetMembers from '../team/useGetMembers';
import { isBefore } from 'date-fns';
import { useEffect } from 'react';

function TaskDetails() {
  const { orgId, taskId } = useParams<{
    orgId: string;
    taskId: string;
  }>();
  const { deleteTask, isDeletingTask } = useDeleteTask();
  const { updateTask, isUpdating } = useUpdateTask();
  const { task, isLoading, error } = useGetTask(orgId || '', taskId || '');
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const { members } = useGetMembers(orgId!);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: task?.name || '',
      description: task?.description || '',
      dueDate: task?.dueDate ? new Date(task.dueDate) : new Date(),
      assigneeId: task?.assignee._id || '',
      status: task?.status || 'TODO',
    },
  });

  // Reset form when task data changes
  useEffect(() => {
    if (task) {
      reset({
        name: task.name,
        description: task.description || '',
        dueDate: new Date(task.dueDate),
        assigneeId: task.assignee._id,
        status: task.status,
      });
    }
  }, [task, reset]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">Error</h3>
          <p className="mt-1 text-sm text-gray-500">
            {error?.message || 'Failed to load task'}
          </p>
        </div>
      </div>
    );
  }

  const handleEditSubmit = (data: any) => {
    if (!orgId || !task.projectId._id) return;

    updateTask(
      {
        orgId,
        projectId: task.projectId._id,
        taskId: task._id,
        data: {
          name: data.name,
          description: data.description,
          dueDate: format(data.dueDate, 'yyyy-MM-dd'),
          assigneeId: data.assigneeId,
          status: data.status,
        },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    reset();
  };

  return (
    <div>
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between ml-6 mr-6 mt-2 mb-6">
        {!isEditing && (
          <Button
            variant="outline"
            className="flex items-center gap-2 md:hidden"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        )}
        <Breadcrumb className="hidden md:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <Avatar>
                <AvatarFallback>
                  {task.projectName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <BreadcrumbLink asChild>
                <Link
                  to={`/organisation/${orgId}/project/${task.projectId._id}`}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  {task.projectName}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>{task.name}</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={handleSubmit(handleEditSubmit)}
                disabled={isUpdating}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {isUpdating ? 'Saving...' : 'Save'}
              </Button>
              <Button
                variant="outline"
                onClick={handleCancelEdit}
                disabled={isUpdating}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Button>
          )}
          <ConfirmationDialog
            isLoading={isDeletingTask}
            resourceType="task"
            resourceName={task.name}
            onConfirm={() => {
              deleteTask(taskId || task._id, {
                onSuccess: () => {
                  navigate(
                    `/organisation/${orgId}/project/${task.projectId._id}`
                  );
                },
              });
            }}
          >
            <Button
              variant="outline"
              className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
              Delete Task
            </Button>
          </ConfirmationDialog>
        </div>
      </div>

      {/* First Container - Task Overview */}
      <div className="max-w-6xl mx-auto px-6 space-y-6">
        <div className="bg-background rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-muted px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Task Overview
            </h2>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Basic Info */}
              <div className="space-y-6">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Task Name</Label>
                      <Input
                        id="name"
                        {...register('name', {
                          required: 'Task name is required',
                          minLength: {
                            value: 3,
                            message: 'Task name must be at least 3 characters',
                          },
                        })}
                        className="mt-1"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name.message?.toString()}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Controller
                        name="status"
                        control={control}
                        rules={{ required: 'Status is required' }}
                        render={({ field }) => (
                          <Select {...field} onValueChange={field.onChange}>
                            <SelectTrigger className="w-full mt-1">
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
                        <p className="text-red-500 text-sm mt-1">
                          {errors.status.message?.toString()}
                        </p>
                      )}
                    </div>
                    <div>
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
                                new Date(
                                  new Date().setDate(new Date().getDate() - 1)
                                )
                              )
                            ) {
                              return 'Due date cannot be in the past';
                            }
                            return true;
                          },
                        }}
                        render={({ field }) => (
                          <DatePicker
                            className="w-full mt-1"
                            {...field}
                            date={field.value}
                            onChange={field.onChange}
                            modal={true}
                          />
                        )}
                      />
                      {errors.dueDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.dueDate.message}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                      {task.name}
                    </h1>
                    <div className="flex items-center gap-4">
                      <StatusBadge
                        status={task.status}
                        className="text-sm px-3 py-1"
                      />
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">
                          Due {format(new Date(task.dueDate), 'MMMM dd, yyyy')}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Side - Assignee */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <User className="w-5 h-5 text-primary/60 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Assignee
                    </h3>
                  </div>
                  {isEditing ? (
                    <div>
                      <Label htmlFor="assigneeId">Assignee</Label>
                      <Controller
                        name="assigneeId"
                        control={control}
                        rules={{ required: 'Assignee is required' }}
                        render={({ field }) => (
                          <Select {...field} onValueChange={field.onChange}>
                            <SelectTrigger className="w-full mt-1">
                              <SelectValue placeholder="Select Assignee" />
                            </SelectTrigger>
                            <SelectContent>
                              {members?.map((member: any) => (
                                <SelectItem key={member._id} value={member._id}>
                                  <div className="flex items-center gap-2">
                                    <Avatar className="w-6 h-6">
                                      <AvatarImage src={member.avatar} />
                                      <AvatarFallback>
                                        {member.firstName.charAt(0)}
                                        {member.lastName.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    {member.firstName} {member.lastName}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.assigneeId && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.assigneeId.message?.toString()}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={task.assignee.avatar as string} />
                          <AvatarFallback>
                            {task.assignee.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold text-gray-900">
                          {task.assignee.name}
                        </p>
                        <p className="text-sm text-gray-500">Team Member</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Container - Details & Project Info */}
        <div className="bg-background rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-muted px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Details & Project Info
            </h2>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <FolderOpen className="w-5 h-5 text-blue-500 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Project
                    </h3>
                  </div>
                  <p className="text-gray-700 font-medium">
                    {task.projectName}
                  </p>
                </div>
              </div>

              {/* Right Side - Description */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6 h-fit">
                  <div className="flex items-center mb-4">
                    <FileText className="w-5 h-5 text-green-500 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Description
                    </h3>
                  </div>
                  {isEditing ? (
                    <div>
                      <Label htmlFor="description">
                        Description (Optional)
                      </Label>
                      <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                          <Textarea
                            {...field}
                            onChange={field.onChange}
                            placeholder="Enter description"
                            className="mt-1"
                          />
                        )}
                      />
                    </div>
                  ) : (
                    <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                      {task.description || (
                        <span className="text-gray-500 italic">
                          No description provided
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
