import React from "react";

type Props = {
  id: number;
  title: string;
};

const Task: React.FC<Props> = (props) => {
  const task = props;
  return (
    <div>
      {task.id}
      {task.title}
    </div>
  );
};

export default Task;
