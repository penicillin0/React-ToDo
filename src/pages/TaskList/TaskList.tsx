import React, { useState } from "react";
import Task from "../../components/Task";
import { Card, ButtonGroup, Button, ConfirmModal, Input } from "ingred-ui";
import { Todo } from "../../types";

type Props = {
  tasks: Todo[];
};

export const TaskList: React.FC<Props> = (props) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const tasks = props.tasks;
  const handleIsCreateModalOpen = (isCreateModalOpen: boolean) => {
    setIsCreateModalOpen(isCreateModalOpen);
  };

  return (
    <div>
      {tasks.map((task: Todo) => (
        <Card p={3}>
          <Task id={task.id} title={task.title}></Task>
          <ButtonGroup size="small">
            <Button onClick={() => console.log("編集")}>編集</Button>
            <Button onClick={() => console.log("削除")}>削除</Button>
          </ButtonGroup>
        </Card>
      ))}
      <Button inline size="small" onClick={() => handleIsCreateModalOpen(true)}>
        追加
      </Button>
      {isCreateModalOpen && (
        <ConfirmModal
          title="タスクの追加"
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={() => console.log("追加")}
          confirmText="登録"
          cancelText="戻る"
        >
          <Input placeholder="task" />
        </ConfirmModal>
      )}
    </div>
  );
};
