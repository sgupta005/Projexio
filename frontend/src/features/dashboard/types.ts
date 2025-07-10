import { Task } from '../tasks/types';

export type Analytics = {
  totalProjects?: number;
  thisWeekProjects?: number;
  totalTasks: number;
  thisWeekTasks: number;
  assignedTasks: number;
  thisWeekAssignedTasks: number;
  completedTasks: number;
  thisWeekCompletedTasks: number;
  overdueTasks: number;
  thisWeekOverdueTasks: number;
};

export interface StatCardProps {
  title: string;
  value: number;
  weeklyValue: number;
  weeklyColor: 'green' | 'red';
}

export interface AnalyticsProps {
  analytics: Analytics;
}

export interface UpcomingTasksProps {
  tasks: Task[];
}

export interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}
