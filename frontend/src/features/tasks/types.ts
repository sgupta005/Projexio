export const statuses = ['BACKLOG', 'TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'];

export type Status = (typeof statuses)[number];

export interface CreateTaskFormFields {
  organisationId: string;
  name: string;
  projectId: string;
  assigneeId: string;
  dueDate: Date;
  description?: string;
  status: Status;
  position: number;
}

export type Task = {
  _id: string;
  name: string;
  projectName: string;
  status: Status;
  assignee: {
    _id: string;
    name: string;
    avatar?: string;
  };
  dueDate: Date;
};

export interface Member {
  _id: string;
  firstName: string;
  lastName: string;
}
