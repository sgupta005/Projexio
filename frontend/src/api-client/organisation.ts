import { Organisation } from '@/features/organisations/SelectOrganisation';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllOrganisations = async function () {
  const response = await fetch(`${API_BASE_URL}/organisation/all`, {
    credentials: 'include',
  });
  const resBody = await response.json();
  const organisations = resBody.data.organisations;
  return organisations;
};

export const createOrganisation = async function (data: Organisation) {
  console.log(data);
  const response = await fetch(`${API_BASE_URL}/organisation/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  const responseBody = await response.json();
  if (!responseBody.success) throw new Error(responseBody.message);
};
