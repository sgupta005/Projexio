const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllProjects = async function (orgId: string) {
  const response = await fetch(
    `${API_BASE_URL}/organisation/${orgId}/project/all`,
    {
      credentials: 'include',
    }
  );
  const resBody = await response.json();
  const projects = resBody.data;
  return projects;
};

export const createProject = async function (data: FormData, orgId: string) {
  const response = await fetch(
    `${API_BASE_URL}/organisation/${orgId}/project/create`,
    {
      method: 'POST',
      credentials: 'include',
      body: data,
    }
  );
  const responseBody = await response.json();
  if (!responseBody.success) throw new Error(responseBody.message);
  return responseBody.data;
};

export const getCurrentProject = async function (
  orgId: string,
  projectId: string
) {
  const response = await fetch(
    `${API_BASE_URL}/organisation/${orgId}/project/${projectId}`,
    {
      credentials: 'include',
    }
  );
  if (!response.ok) throw new Error('Organisation not found.');
  const responseBody = await response.json();
  return responseBody.data;
};

export const getProjectAnalytics = async function (
  orgId: string,
  projectId: string
) {
  const response = await fetch(
    `${API_BASE_URL}/organisation/${orgId}/project/${projectId}/analytics`,
    {
      credentials: 'include',
    }
  );
  const responseBody = await response.json();
  if (!responseBody.success) throw new Error(responseBody.message);
  return responseBody.data;
};
