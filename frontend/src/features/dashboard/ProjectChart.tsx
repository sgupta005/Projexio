import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { BarChart3 } from 'lucide-react';
import { Task } from '../tasks/types';

interface ProjectChartProps {
  tasks: Task[];
}

// List of colors for the project pie chart
const PROJECT_COLORS = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // yellow
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#ef4444', // red
  '#84cc16', // lime
  '#14b8a6', // teal
  '#f97316', // orange
];

export default function ProjectChart({ tasks }: ProjectChartProps) {
  const projectData = useMemo(() => {
    const projectMap = new Map<string, number>();

    // Count tasks by project
    tasks.forEach((task) => {
      const projectName = task.projectName;
      projectMap.set(projectName, (projectMap.get(projectName) || 0) + 1);
    });

    // Convert to array for the chart
    return Array.from(projectMap.entries())
      .map(([name, taskCount], index) => ({
        name,
        taskCount,
        color: PROJECT_COLORS[index % PROJECT_COLORS.length],
      }))
      .sort((a, b) => b.taskCount - a.taskCount); // Sort by task count in descending order
  }, [tasks]);

  const totalTasks = tasks.length;

  if (totalTasks === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
        <div className="flex items-center mb-6">
          <BarChart3 className="w-5 h-5 text-gray-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">
            Projects Distribution
          </h2>
        </div>
        <div className="py-12 text-center text-gray-500">
          <p className="text-lg">No project data available</p>
          <p className="text-sm">
            Tasks will appear here when assigned to projects
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BarChart3 className="w-5 h-5 text-gray-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">
            Projects Distribution
          </h2>
        </div>
        <span className="text-sm text-gray-500">{totalTasks} total tasks</span>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={projectData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={2}
              dataKey="taskCount"
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
              labelLine={false}
            >
              {projectData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, props) => [
                `${value} tasks`,
                props.payload.name,
              ]}
              contentStyle={{
                borderRadius: '6px',
                border: '1px solid #e5e7eb',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        {projectData.map((project) => (
          <div key={project.name} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: project.color }}
            />
            <span className="text-sm text-gray-700 truncate">
              {project.name}
            </span>
            <span className="ml-auto text-sm font-medium">
              {project.taskCount} tasks
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
