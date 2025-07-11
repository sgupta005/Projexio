import { Link, useParams } from 'react-router-dom';
import useGetTask from './useGetTask';
import { LoadingSpinner } from '@/ui/Spinner';
import { format } from 'date-fns';
import { StatusBadge } from './StatusBadge';
import { AvatarFallback, AvatarImage } from '@/ui/Avatar';

import Button from '@/ui/Button';
import {
  Calendar,
  User,
  FolderOpen,
  FileText,
  Edit,
  Trash2,
  ChevronRight,
} from 'lucide-react';
import { useDeleteTask } from './useDeleteTask';
import ConfirmationModal from '@/ui/ConfirmationModal';
import { useNavigate } from 'react-router-dom';

function TaskDetails() {
  const { orgId, taskId } = useParams<{
    orgId: string;
    taskId: string;
  }>();
  const { deleteTask, isDeletingTask } = useDeleteTask();
  const { task, isLoading, error } = useGetTask(orgId || '', taskId || '');
  const navigate = useNavigate();
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

  return (
    <div>
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between ml-6 mr-6 mt-2 mb-6">
        <nav className="flex items-center space-x-2 ">
          <AvatarFallback className="rounded-sm bg-primary text-muted size-8">
            {task.projectName.charAt(0).toUpperCase()}
          </AvatarFallback>
          <Link
            to={`/organisation/${orgId}/project/${task.projectId._id}`}
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            {task.projectName}
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
          <span className="text-gray-900 font-semibold">{task.name}</span>
        </nav>
        <ConfirmationModal
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
        </ConfirmationModal>
      </div>

      {/* First Container - Task Overview */}
      <div className="max-w-6xl mx-auto px-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header with Edit Button */}
          <div className="bg-muted px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Task Overview
            </h2>
            <Button variant="outline" className="flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Edit
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Basic Info */}
              <div className="space-y-6">
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
                  <div className="flex items-center">
                    <div className="relative">
                      {task.assignee.avatar ? (
                        <AvatarImage
                          src={task.assignee.avatar}
                          className="h-12 w-12 rounded-full border-2 border-gray-100"
                        />
                      ) : (
                        <AvatarFallback className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold text-lg border-2 border-gray-100">
                          {task.assignee.name.charAt(0)}
                        </AvatarFallback>
                      )}
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-gray-900">
                        {task.assignee.name}
                      </p>
                      <p className="text-sm text-gray-500">Team Member</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Container - Details & Project Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header with Edit Button */}
          <div className="bg-muted px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Details & Project Info
            </h2>
            <Button variant="outline" className="flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Edit
            </Button>
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
                {task.description ? (
                  <div className="bg-gray-50 rounded-lg p-6 h-fit">
                    <div className="flex items-center mb-4">
                      <FileText className="w-5 h-5 text-green-500 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Description
                      </h3>
                    </div>
                    <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                      {task.description}
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6 h-fit">
                    <div className="flex items-center mb-4">
                      <FileText className="w-5 h-5 text-gray-400 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Description
                      </h3>
                    </div>
                    <p className="text-gray-500 italic">
                      No description provided
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
