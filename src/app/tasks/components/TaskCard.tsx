'use client';

import { Task } from "@/types/task";
import { useDeleteTask, useUpdateTask } from "@/hooks/useTasks";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const deleteTask = useDeleteTask();
  const updateTask = useUpdateTask();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const toastId = toast.loading("Deleting task...");
        await deleteTask.mutateAsync(task.id);
        toast.update(toastId, {
          render: "Task deleted successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } catch (error) {
        toast.error("Failed to delete task");
        console.error("Error deleting task:", error);
      }
    }
  };

  const handleToggleComplete = async () => {
    try {
      const toastId = toast.loading("Updating task...");
      await updateTask.mutateAsync({
        id: task.id,
        data: { completed: !task.completed },
      });
      toast.update(toastId, {
        render: `Task marked as ${!task.completed ? "completed" : "incomplete"}`,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Failed to update task");
      console.error("Error updating task:", error);
    }
  };

  return (
    <div
      className={`flex mt-2 items-center justify-between p-4 rounded-lg ${
        task.completed ? "bg-custom-dark-gray" : "bg-custom-dark-gray"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          onClick={(e) => {
            e.preventDefault();
            handleToggleComplete();
          }}
          className={`relative z-20 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${
            !task.completed ? "border border-custom-blue" : ""
          }`}
        >
          {task.completed && (
            <div className="opacity-100">
              <Image 
                src="/icons/tick.svg" 
                alt="Check" 
                width={24}
                height={24}
                className="w-full h-full opacity-100"
              />
            </div>
          )}
        </div>
      
        <Link href={`/tasks/edit/${task.id}`}>
          <span
            className={`text-base ${
              task.completed
                ? "line-through text-gray-500 opacity-60"
                : "text-gray-200"
            }`}
          >
            {task.title}
          </span>
        </Link>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          handleDelete();
        }}
        className={`text-gray-400 hover:text-red-500 ${
          task.completed ? "opacity-60" : ""
        }`}
        disabled={deleteTask.isLoading}
      >
        <Image src="/icons/trash.svg" alt="Trash" width={15} height={15} />
      </button>
    </div>
  );
};

export default TaskCard;
