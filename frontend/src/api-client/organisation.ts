const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllOrganisations = async function () {
  const response = await fetch(`${API_BASE_URL}/organisation/all`, {
    credentials: 'include',
  });
  const resBody = await response.json();
  const organisations = resBody.data.organisations;
  return organisations;
};

export const createOrganisation = async function (data: FormData) {
  const response = await fetch(`${API_BASE_URL}/organisation/create`, {
    method: 'POST',
    credentials: 'include',
    body: data,
  });
  const responseBody = await response.json();
  if (!responseBody.success) throw new Error(responseBody.message);
  return responseBody.data.organisation;
};

export const getCurrentOrganisation = async function (orgId: string) {
  const response = await fetch(`${API_BASE_URL}/organisation/${orgId}`, {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Organisation not found.');
  const responseBody = await response.json();
  return responseBody.data;
};

export const joinOrganisation = async function (inviteCode: string) {
  const response = await fetch(`${API_BASE_URL}/organisation/join`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ inviteCode }),
  });
  const responseBody = await response.json();
  if (!responseBody.success) throw new Error(responseBody.message);
  return responseBody.data.organisation;
};

export const getMembers = async function (organisationId: string) {
  const response = await fetch(
    `${API_BASE_URL}/organisation/${organisationId}/members`,
    {
      credentials: 'include',
    }
  );
  const responseBody = await response.json();
  if (!responseBody.success) throw new Error(responseBody.message);
  return responseBody.data;
};

export const removeMember = async function (
  organisationId: string,
  memberId: string
) {
  const response = await fetch(
    `${API_BASE_URL}/organisation/${organisationId}/members/${memberId}/remove`,
    {
      credentials: 'include',
    }
  );
  const responseBody = await response.json();
  if (!responseBody.success) throw new Error(responseBody.message);
};

export const makeAdmin = async function (
  organisationId: string,
  memberId: string
) {
  const response = await fetch(
    `${API_BASE_URL}/organisation/${organisationId}/members/${memberId}/makeAdmin`,
    {
      credentials: 'include',
    }
  );
  const responseBody = await response.json();
  if (!responseBody.success) throw new Error(responseBody.message);
  return responseBody.data;
};

export const getOrganisationAnalytics = async function (
  organisationId: string
) {
  const response = await fetch(
    `${API_BASE_URL}/organisation/${organisationId}/analytics`,
    {
      credentials: 'include',
    }
  );
  const responseBody = await response.json();
  if (!responseBody.success) throw new Error(responseBody.message);
  return responseBody.data;
};

export const deleteOrganisation = async function (organisationId: string) {
  const response = await fetch(
    `${API_BASE_URL}/organisation/${organisationId}`,
    {
      method: 'DELETE',
      credentials: 'include',
    }
  );
  const responseBody = await response.json();
  if (!responseBody.success) throw new Error(responseBody.message);
};
