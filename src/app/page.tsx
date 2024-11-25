import { useTasks } from "@/hooks/useTasks";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Task } from "@/types/task";


const TaskSummary = dynamic(() => import("@/app/tasks/components/TaskSummary"), {
  ssr: false,
});

const HomePage = () => {

  return (
    <div>
      <TaskSummary />
    </div>
  );
};

export default HomePage;
