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
