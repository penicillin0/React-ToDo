import React from "react";
import Task from "../components/Task";
import { Card, ButtonGroup, Button } from "ingred-ui";

type Props = {
  tasks: Tasktype[];
};

type Tasktype = {
  id: number;
  title: string;
};

const TaskList: React.FC<Props> = (props) => {
  const tasks = props.tasks;
  return (
    <div>
      {tasks.map((task: Tasktype) => (
        <Card p={3}>
          <Task id={task.id} title={task.title}></Task>
          <ButtonGroup size="small">
            <Button onClick={() => console.log("削除")}>削除</Button>
            <Button onClick={() => console.log("編集")}>編集</Button>
          </ButtonGroup>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
