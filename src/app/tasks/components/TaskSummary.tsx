'use client';

import { Task } from "@/types/task";
import dynamic from "next/dynamic";
import { useTasks } from "@/hooks/useTasks";
import Link from "next/link";
import Image from "next/image";

const TaskCard = dynamic(() => import("@/app/tasks/components/TaskCard"), {
  ssr: false,
});

const TaskSummary = () => {
  const { data: tasks, isLoading, error } = useTasks();

  const totalTasks = tasks?.length || 0;
  const completedTasks = tasks?.filter((task) => task.completed).length || 0;

  if (isLoading) return <div className="text-gray-300 text-center">Loading...</div>;
  if (error) return <div className="text-red-400 text-center">Error loading tasks</div>;

  return (
    <div className="min-h-screen relative font-custom-font">
      <div className="absolute inset-0 bg-black h-[26%]" />
      <div className="absolute inset-0 top-[25%] bg-custom-gray-100 h-[95%]" />
      <div className="relative max-w-3xl mx-auto px-4 pt-8 text-white">
        <header className="text-center">
          <div className="flex items-center justify-center gap-2 mt-10">
            <Image src="/icons/rocket.svg" alt="Rocket" width={15} height={10} />
            <Image src="/icons/logo.svg" alt="Rocket" width={150} height={150} />
          </div>
          <Link href="/tasks/create">
            <button className="mt-10 px-4 sm:px-20 md:px-60 py-2 bg-custom-blue text-white rounded-lg flex items-center mx-auto font-medium">
              Create Task 
              <span className="ml-2">
                <Image src="/icons/plus.svg" alt="Plus" width={15} height={15} />
              </span>
            </button>
          </Link>
        </header>

        <div className="flex flex-col sm:flex-row justify-between mt-10 text-sm pb-4 border-b border-gray-700">
          <div className="flex items-center justify-center sm:justify-start text-custom-blue font-medium mb-2 sm:mb-0">
            Tasks
            <span className="text-white ml-2 bg-custom-dark-gray rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {totalTasks}
            </span>
          </div>
          <div className="flex items-center justify-center sm:justify-start text-custom-purple font-medium">
            Completed
            <span className="text-white ml-2 bg-custom-dark-gray rounded-full w-10 h-5 flex items-center justify-center text-xs">
              {completedTasks} de {totalTasks}
            </span>
          </div>
        </div>

        {totalTasks === 0 && (
          <div className="text-center py-8 sm:py-16 flex flex-col items-center gap-4">
            <div className="text-gray-500 text-4xl sm:text-6xl">
              <Image 
                src="/icons/empty.svg" 
                alt="Clipboard" 
                width={50} 
                height={50} 
                className="mx-auto"
              />
            </div>
            <p className="text-font-gray text-base sm:text-lg px-4 font-medium">
              You don't have any tasks registered yet.
            </p>
            <p className="text-font-gray opacity-50 text-xs sm:text-sm px-4 font-normal">
              Create tasks and organize your to-do items.
            </p>
          </div>
        )}

        <div className="space-y-4 mt-6 pb-20">
          {tasks?.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskSummary;
