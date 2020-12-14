import React, { useEffect, useState } from "react";
import Task from "../../components/Task";
import { Button, ConfirmModal, Divider, Input, Spacer } from "ingred-ui";
import { Todo } from "../../types";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import TaskStatus from "../../components/TaskStatus";
import { findAllByAltText } from "@testing-library/react";

type Props = {
  todos: Todo[];
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, title: string) => void;
  checkTodo: (id: number) => void;
};

export const TaskList: React.FC<Props> = ({
  todos,
  addTodo,
  deleteTodo,
  editTodo,
  checkTodo,
}) => {
  const [inputTaskValue, setInputTaskValue] = useState<string>();
  const [isInputError, setIsInputError] = useState<boolean>(false);
  const [isDisplayFinishTask, setIsDisplayFinishTask] = useState<boolean>(
    false
  );
  const onHandleSubmit = (value: string | undefined) => {
    if (value === undefined || value === "") {
      setIsInputError(true);
      return;
    }
    addTodo(value);
    setInputTaskValue("");
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

  const handleInputChange = (value: string) => {
    setIsInputError(false);
    setInputTaskValue(value);
  };

  const placeholderMsg = (isError: boolean): string => {
    if (isError) {
      return "空文字は追加できません";
    } else {
      return "追加したいタスク名を入力してください";
    }
  };

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <MainContainer>
      <TaskStatus todos={todos}></TaskStatus>
      <InputContainer>
        <Input
          error={isInputError}
          value={inputTaskValue}
          placeholder={placeholderMsg(isInputError)}
          name="title"
          type="text"
          autoFocus={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e.target.value)
          }
          width="80%"
          onSubmit={() => onHandleSubmit}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onHandleSubmit(inputTaskValue);
            }
          }}
        />
      </InputContainer>

      <TaskListWrapper>
        {todos
          .filter((task: Todo) => {
            return !task.isFinish;
          })
          .map((task: Todo) => (
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
      <Spacer pt={3}></Spacer>
      <VisibleButtonContainer>
        <Button
          onClick={() => setIsDisplayFinishTask(!isDisplayFinishTask)}
          size="small"
          color="secondary"
        >
          {isDisplayFinishTask
            ? "完了済みのタスクを非表示にする"
            : "完了済みのタスクを表示"}
        </Button>
      </VisibleButtonContainer>
      {isDisplayFinishTask ? (
        <TaskListWrapper>
          {todos
            .filter((task: Todo) => {
              return task.isFinish;
            })
            .map((task: Todo) => (
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
      ) : (
        <div></div>
      )}
    </MainContainer>
  );
};

const VisibleButtonContainer = styled.div`
  width: 30%;
  margin: 0 auto;
`;

const TaskListWrapper = styled.div`
  align-items: center;
`;

const InputContainer = styled.div`
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
