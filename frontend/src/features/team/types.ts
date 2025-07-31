export type Member = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role: 'member' | 'admin';
};
