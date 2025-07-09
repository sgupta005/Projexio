import { useParams, useNavigate } from 'react-router-dom';
import useGetTask from './useGetTask';
import { LoadingSpinner } from '@/ui/Spinner';
import { format } from 'date-fns';
import { StatusBadge } from './StatusBadge';
import { AvatarFallback, AvatarImage } from '@/ui/Avatar';
import Button from '@/ui/Button';
import { ArrowLeft, Calendar, User, FolderOpen, FileText } from 'lucide-react';

function TaskDetails() {
  const { orgId, taskId } = useParams<{
    orgId: string;
    taskId: string;
  }>();
  const navigate = useNavigate();

  const { task, isLoading, error } = useGetTask(orgId || '', taskId || '');

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
    <div className="min-h-full">
      {/* Back Button */}
      <Button
        variant="outline"
        className="ml-8 mt-2 sm:mt-0"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-muted px-8 py-6 border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
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
          </div>

          {/* Content Grid */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* Project Information */}
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

                {/* Description */}
                {task.description && (
                  <div className="bg-gray-50 rounded-lg p-6">
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
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Assignee Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
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

                {/* Task Details Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Task Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-sm font-medium text-gray-600">
                        Status
                      </span>
                      <StatusBadge status={task.status} />
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-sm font-medium text-gray-600">
                        Due Date
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm font-medium text-gray-600">
                        Project
                      </span>
                      <span className="text-sm font-semibold text-gray-900 truncate max-w-32">
                        {task.projectName}
                      </span>
                    </div>
                  </div>
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
