import React from "react";
import Task from "../components/Task";

type Props = {
  tasks: Tasktype[];
};

type Tasktype = {
  title: string;
};

const TaskList: React.FC<Props> = (props) => {
  const tasks = props.tasks;
  return (
    <div>
      {tasks.map((task: Tasktype) => (
        <Task title={task.title}></Task>
      ))}
    </div>
  );
};

export default TaskList;
