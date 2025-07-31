import { AnalyticsProps, StatCardProps } from '../types';

function StatCard({ title, value, weeklyValue, weeklyColor }: StatCardProps) {
  return (
    <div className="cursor-pointer bg-background border border-gray-200 rounded-lg p-3 sm:p-6 shadow-sm md:w-[220px] hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs sm:text-sm font-medium text-gray-600">
            {title}
          </p>
          <p className="text-xl sm:text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">This Week</p>
          <p
            className={`text-sm sm:text-md font-semibold ${
              weeklyColor === 'green' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            +{weeklyValue}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Analytics({ analytics }: AnalyticsProps) {
  const {
    totalProjects,
    thisWeekProjects,
    totalTasks,
    thisWeekTasks,
    assignedTasks,
    thisWeekAssignedTasks,
    completedTasks,
    thisWeekCompletedTasks,
    overdueTasks,
    thisWeekOverdueTasks,
  } = analytics;

  const stats = [
    ...(totalProjects !== undefined && thisWeekProjects !== undefined
      ? [
          {
            title: 'Total Projects',
            value: totalProjects,
            weeklyValue: thisWeekProjects,
            weeklyColor: 'green' as const,
          },
        ]
      : []),
    {
      title: 'Total Tasks',
      value: totalTasks,
      weeklyValue: thisWeekTasks,
      weeklyColor: 'green' as const,
    },
    {
      title: 'Assigned Tasks',
      value: assignedTasks,
      weeklyValue: thisWeekAssignedTasks,
      weeklyColor: 'green' as const,
    },
    {
      title: 'Completed Tasks',
      value: completedTasks,
      weeklyValue: thisWeekCompletedTasks,
      weeklyColor: 'green' as const,
    },
    {
      title: 'Overdue Tasks',
      value: overdueTasks,
      weeklyValue: thisWeekOverdueTasks,
      weeklyColor: 'red' as const,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap gap-2 sm:gap-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          weeklyValue={stat.weeklyValue}
          weeklyColor={stat.weeklyColor}
        />
      ))}
    </div>
  );
}
