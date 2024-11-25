'use client';
import { useTaskById } from "@/hooks/useTasks";
import TaskForm from "../../components/TaskForm";

const EditTaskPage = ({ params }: { params: { id: string } }) => {
  const { data: task } = useTaskById(params.id);

  if (!task) return <div>Loading...</div>;

  return <TaskForm initialData={task} />;
};

export default EditTaskPage;
