import { CreateTaskFormFields } from '@/features/tasks/types';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createTask(taskData: CreateTaskFormFields) {
  const response = await fetch(
    `${API_BASE_URL}/organisation/${taskData.organisationId}/project/${taskData.projectId}/task/create`,
    {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to create task');
  }

  const resBody = await response.json();
  return resBody.data;
}

export async function getAllTasks(projectId: string, orgId: string) {
  const response = await fetch(
    `${API_BASE_URL}/organisation/${orgId}/project/${projectId}/task/all`,
    { credentials: 'include' }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  const resBody = await response.json();
  return resBody.data;
}

export async function updateTaskStatus(
  orgId: string,
  projectId: string,
  taskId: string,
  status: string,
  position: number
) {
  const response = await fetch(
    `${API_BASE_URL}/organisation/${orgId}/project/${projectId}/task/update-status`,
    {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskId, status, position }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to update task status');
  }

  const resBody = await response.json();
  return resBody.data;
}

export async function updateTask(
  orgId: string,
  projectId: string,
  taskId: string,
  data: {
    name: string;
    description?: string;
    dueDate: string;
    assigneeId: string;
    status: string;
  }
) {
  const response = await fetch(
    `${API_BASE_URL}/organisation/${orgId}/project/${projectId}/task/${taskId}`,
    {
      credentials: 'include',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to update task');
  }

  const resBody = await response.json();
  return resBody.data;
}

export async function getUserTasksByOrganisation(
  orgId: string,
  userId: string
) {
  const response = await fetch(
    `${API_BASE_URL}/organisation/${orgId}/task/user/${userId}`,
    { credentials: 'include' }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch user tasks');
  }

  const resBody = await response.json();
  return resBody.data;
}

export async function getTaskById(orgId: string, taskId: string) {
  const response = await fetch(
    `${API_BASE_URL}/organisation/${orgId}/task/${taskId}`,
    { credentials: 'include' }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch task');
  }

  const resBody = await response.json();
  return resBody.data;
}

export const deleteTask = async function (taskId: string, orgId: string) {
  const response = await fetch(
    `${API_BASE_URL}/organisation/${orgId}/task/${taskId}`,
    {
      method: 'DELETE',
      credentials: 'include',
    }
  );
  const responseBody = await response.json();
  if (!responseBody.success) throw new Error(responseBody.message);
};
