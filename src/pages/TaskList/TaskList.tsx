import React, { useEffect, useState } from "react";
import Task from "../../components/Task";
import { Button, ConfirmModal, Input } from "ingred-ui";
import { Todo } from "../../types";
import { useForm } from "react-hook-form";

type Props = {
  todos: Todo[];
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, title: string) => void;
};

type CreateTodoForm = {
  title: string;
};

export const TaskList: React.FC<Props> = ({
  todos,
  addTodo,
  deleteTodo,
  editTodo,
}) => {
  const { register, handleSubmit, errors } = useForm();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const handleIsCreateModalOpen = (isCreateModalOpen: boolean) => {
    setIsCreateModalOpen(isCreateModalOpen);
  };

  const onHandleSubmit = (data: CreateTodoForm) => {
    addTodo(data.title);
    setIsCreateModalOpen(false);
  };

  const onDelete = (id: number) => {
    deleteTodo(id);
  };

  const onEdit = (id: number, title: string) => {
    editTodo(id, title);
  };

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <div>
      {todos.map((task: Todo) => (
        <Task
          id={task.id}
          title={task.title}
          handleDelete={onDelete}
          handleEdit={onEdit}
        ></Task>
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
            autoFocus={true}
          />
        </ConfirmModal>
      )}
    </div>
  );
};
