import React from "react";

type Props = {
  title: string;
};

const Task: React.FC<Props> = (props) => {
  const task = props;
  return <div>{task.title}</div>;
};

export default Task;
