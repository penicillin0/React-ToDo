import React, { useEffect, useState } from "react";
import Task from "../../components/Task";
import { Button, ConfirmModal, Input } from "ingred-ui";
import { Todo } from "../../types";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import TaskStatus from "../../components/TaskStatus";

type Props = {
  todos: Todo[];
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, title: string) => void;
  checkTodo: (id: number) => void;
};

type CreateTodoForm = {
  title: string;
};

export const TaskList: React.FC<Props> = ({
  todos,
  addTodo,
  deleteTodo,
  editTodo,
  checkTodo,
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

  const onCheck = (id: number) => {
    checkTodo(id);
  };

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <MainContainer>
      <TaskStatus todos={todos}></TaskStatus>
      <AddButtonContainer>
        <Button
          inline
          size="large"
          onClick={() => handleIsCreateModalOpen(true)}
        >
          追加
        </Button>
      </AddButtonContainer>
      <TaskListWrapper>
        {todos.map((task: Todo) => (
          <div>
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              isFinish={task.isFinish}
              handleDelete={onDelete}
              handleEdit={onEdit}
              handleCheck={onCheck}
            ></Task>
            <TaskSplitLine />
          </div>
        ))}
      </TaskListWrapper>
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
    </MainContainer>
  );
};

const TaskListWrapper = styled.div`
  align-items: center;
`;

const AddButtonContainer = styled.div`
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: white;
`;

const MainContainer = styled.div`
  padding: 6%;
`;

const TaskSplitLine = styled.hr`
  border: 0;
  border-bottom: 1px dashed;
`;
