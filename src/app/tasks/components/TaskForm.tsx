'use client';

import { Task } from "@/types/task";
import { useState } from "react";
import { useCreateTask, useUpdateTask } from "@/hooks/useTasks";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import Image from 'next/image';

interface TaskFormProps {
  initialData?: Partial<Task>;
}

const TaskForm = ({ initialData }: TaskFormProps) => {
  const router = useRouter();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const [title, setTitle] = useState(initialData?.title || "");
  const [color, setColor] = useState(initialData?.color || "#FF5733");

  const isLoading = createTask.isLoading || updateTask.isLoading;

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    router.back();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading(initialData?.id ? "Updating task..." : "Creating task...");

    try {
      if (initialData?.id) {
        await updateTask.mutateAsync({
          id: initialData.id,
          data: { title, color }
        });
        toast.update(toastId, {
          render: "Task updated successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000
        });
      } else {
        await createTask.mutateAsync({ title, color });
        toast.update(toastId, {
          render: "Task created successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000
        });
      }
      router.push("/");
    } catch (error) {
      toast.update(toastId, {
        render: "Failed to save task",
        type: "error",
        isLoading: false,
        autoClose: 2000
      });
      console.error('Error saving task:', error);
    }
  };

  return (
    <div className="min-h-screen relative font-custom-font">
      <div className="absolute inset-0 bg-black h-[20%]" />
      <div className="absolute inset-0 top-[10%] bg-custom-gray-100 h-[90%]" />

      <div className="relative max-w-3xl mx-auto px-4 pt-10">
        <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto px-4 pt-2">
          <h2 className="text-2xl font-semibold text-center mb-6 text-white flex items-center justify-center gap-2">
            <Image src="/icons/rocket.svg" alt="Rocket" width={15} height={10} />
            <Image src="/icons/logo.svg" alt="Logo" width={150} height={150} />
          </h2>
          <div onClick={handleBack} className="cursor-pointer mt-20">
            <Image src="/icons/lwft.svg" alt="Logo" width={20} height={20} />

          </div>

          <div className="mb-6 mt-2">
            <label htmlFor="title" className="block text-sm font-bold text-custom-blue mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex. Brush your teeth"
              required
              className="w-full p-4 bg-custom-dark-gray text-gray-200 rounded-lg focus:ring-2 focus:ring-custom-blue focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold  text-custom-blue mb-2">
              Color
            </label>
            <div className="flex gap-2 p-4 rounded-lg">
              {[
                "#FF5733", "#FFA500", "#32CD32", "#1E90FF",
                "#9370DB", "#FF1493", "#A52A2A"
              ].map((c) => (
                <div
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-full cursor-pointer ${color === c ? 'ring-2 ring-custom-blue' : ''
                    }`}
                  style={{ backgroundColor: c }}
                ></div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-custom-blue text-white py-4 rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Add Task'}
            <Image src="/icons/plus.svg" alt="Plus" width={15} height={15} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
