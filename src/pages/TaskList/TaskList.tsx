import React, { useEffect, useState } from "react";
import Task from "../../components/Task";
import { Button, Input, Spacer } from "ingred-ui";
import { Todo } from "../../types";
import styled from "styled-components";
import TaskStatus from "../../components/TaskStatus";

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
      return "追加したいタスク名を入力してください, リターンキーを押して保存して下さい";
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
          autoComplete="off"
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
              <Spacer pt={1} />
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
                <Spacer pt={1} />
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
  padding-bottom: 2%;
`;

const TaskListWrapper = styled.div`
  align-items: center;
`;

const InputContainer = styled.div`
  margin-bottom: 2%;
  text-align: center;
`;

const MainContainer = styled.div`
  padding-top: 5%;
  padding-right: 2%;
  padding-left: 2%;
  padding-bottom: 10%;
  background-color: whitesmoke;
`;
