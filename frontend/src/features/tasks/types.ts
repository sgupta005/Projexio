export interface CreateTaskFormFields {
  organisationId: string;
  name: string;
  projectId: string;
  assigneeId: string;
  dueDate: Date;
  description?: string;
  status: 'BACKLOG' | 'TODO' | 'IN_REVIEW' | 'IN_PROGRESS' | 'DONE';
  position: number;
}

export interface Member {
  _id: string;
  firstName: string;
  lastName: string;
}
