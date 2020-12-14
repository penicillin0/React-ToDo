import React, { useState } from "react";
import { Card, ButtonGroup, Button, Input, Checkbox } from "ingred-ui";
import { useForm } from "react-hook-form";
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
  const { register, handleSubmit, errors } = useForm();
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(title);
  const [isChecked, setIsChecked] = useState<boolean>(isFinish);

  const task = { id, title };

  const startEdit = () => {
    setIsEditting(true);
  };

  const handleApplyEdit = (data: { title: string }) => {
    setIsEditting(false);
    handleEdit(id, data.title);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleCancelEdit = () => {
    setIsEditting(false);
  };

  const handleApplyCheck = () => {
    setIsChecked(!isFinish);
    handleCheck(id);
  };
  return (
    <div>
      {isEditting ? (
        <Card p={3}>
          <CardContent>
            <CheckboxContainer>
              <Checkbox
                checked={isChecked}
                onChange={handleApplyCheck}
              ></Checkbox>
            </CheckboxContainer>
            <Input
              value={inputValue}
              name="title"
              type="text"
              autoFocus={true}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e.target.value)
              }
              ref={register({ required: true })}
            />
            <ButtonGroupContainer>
              <ButtonGroup size="small">
                <Button onClick={handleSubmit(handleApplyEdit)}>適用</Button>
                <Button onClick={handleCancelEdit}>中止</Button>
              </ButtonGroup>
            </ButtonGroupContainer>
          </CardContent>
        </Card>
      ) : (
        <Card p={3}>
          <CardContent>
            <CheckboxContainer>
              <Checkbox
                checked={isChecked}
                onChange={handleApplyCheck}
              ></Checkbox>
            </CheckboxContainer>
            {task.title}
            {"　　　　　[DEBUG]:taskId->" + task.id}
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
  display: flex;
`;

const CheckboxContainer = styled.div`
  display: inline;
  padding-right: 24px;
`;

const ButtonGroupContainer = styled.div`
  display: inline;
  text-align: right;
  margin-left: auto;
`;
