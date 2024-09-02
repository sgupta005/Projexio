import { SignupFormFields } from '@/features/auth/SignupForm';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = async function (userData: SignupFormFields) {
  const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(userData),
  });
  const responseBody = await res.json();
  if (!responseBody.success) throw new Error(responseBody.message);
};

export const verifyLogin = async function () {
  const response = await fetch(`${API_BASE_URL}/api/auth/verify-login`, {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Invalid Token');
  const responseBody = await response.json();
  return responseBody;
};
