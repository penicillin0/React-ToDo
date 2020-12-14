import React, { useState } from "react";
import { Card, ButtonGroup, Button, Input, Checkbox } from "ingred-ui";
import styled from "styled-components";

type Props = {
  id: number;
  title: string;
  isFinish: boolean;
  handleDelete: (id: number) => void;
  handleEdit: (id: number, title: string) => void;
  handleCheck: (id: number) => void;
};

const Task: React.FC<Props> = ({
  id,
  title,
  isFinish,
  handleDelete,
  handleEdit,
  handleCheck,
}) => {
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(title);
  const [isChecked, setIsChecked] = useState<boolean>(isFinish);
  const [isInputError, setIsInputError] = useState<boolean>(false);

  const task = { id, title };

  const startEdit = () => {
    setIsEditting(true);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setIsInputError(false);
  };

  const handleCancelEdit = () => {
    setIsEditting(false);
  };

  const handleApplyCheck = () => {
    setIsChecked(!isFinish);
    handleCheck(id);
  };

  const onHandleSubmit = (value: string | undefined) => {
    if (value === undefined || value === "") {
      setIsInputError(true);
      return;
    }
    console.log(value);
    setIsEditting(false);
    handleEdit(id, value);
    setInputValue(value);
  };

  return (
    <div>
      {isEditting ? (
        <Card p={2}>
          <CardContent>
            <CheckboxContainer>
              <Checkbox
                checked={isChecked}
                onChange={handleApplyCheck}
              ></Checkbox>
            </CheckboxContainer>
            <EditInputContainer>
              <Input
                value={inputValue}
                name="title"
                type="text"
                error={isInputError}
                autoFocus={true}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e.target.value)
                }
                autoComplete="off"
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onHandleSubmit(inputValue);
                  }
                }}
              />
            </EditInputContainer>
            <ButtonGroupContainer>
              <ButtonGroup size="small">
                <Button onClick={() => onHandleSubmit(inputValue)}>適用</Button>
                <Button onClick={handleCancelEdit}>中止</Button>
              </ButtonGroup>
            </ButtonGroupContainer>
          </CardContent>
        </Card>
      ) : (
        <Card p={2}>
          <CardContent>
            <CheckboxContainer>
              <Checkbox
                checked={isChecked}
                onChange={handleApplyCheck}
              ></Checkbox>
            </CheckboxContainer>
            <TaskContainer>{task.title}</TaskContainer>
            <ButtonGroupContainer>
              <ButtonGroup size="small">
                <Button onClick={() => startEdit()}>編集</Button>
                <Button onClick={() => handleDelete(task.id)}>削除</Button>
              </ButtonGroup>
            </ButtonGroupContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Task;

const CardContent = styled.div`
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditInputContainer = styled.div`
  padding-left: 4%;
`;

const CheckboxContainer = styled.div`
  padding-left: 2%;
`;

const TaskContainer = styled.div`
  padding-left: 5%;
`;

const ButtonGroupContainer = styled.div`
  margin-left: auto;
`;
