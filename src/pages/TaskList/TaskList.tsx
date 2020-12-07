import React, { useEffect, useState } from "react";
import Task from "../../components/Task";
import { Card, ButtonGroup, Button, ConfirmModal, Input } from "ingred-ui";
import { Todo } from "../../types";
import { useForm } from "react-hook-form";

type Props = {
  todos: Todo[];
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
};

type CreateTodoForm = {
  title: string;
};

export const TaskList: React.FC<Props> = ({ todos, addTodo, deleteTodo }) => {
  const { register, handleSubmit, errors } = useForm();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const handleIsCreateModalOpen = (isCreateModalOpen: boolean) => {
    setIsCreateModalOpen(isCreateModalOpen);
  };

  const onHandleSubmit = (data: CreateTodoForm) => {
    addTodo(data.title);
    setIsCreateModalOpen(false);
  };

  const handleDlete = (id: number) => {
    deleteTodo(id);
  };

  return (
    <div>
      {todos.map((task: Todo) => (
        <Card p={3}>
          <Task id={task.id} title={task.title}></Task>
          <ButtonGroup size="small">
            <Button onClick={() => console.log("編集")}>編集</Button>
            <Button onClick={() => handleDlete(task.id)}>削除</Button>
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
          onSubmit={handleSubmit(onHandleSubmit)}
          confirmText="登録"
          cancelText="戻る"
        >
          <Input
            placeholder="task"
            ref={register({ required: true })}
            name="title"
          />
        </ConfirmModal>
      )}
    </div>
  );
};
