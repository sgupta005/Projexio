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
