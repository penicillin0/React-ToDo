import React, { useState } from "react";
import { Card, ButtonGroup, Button } from "ingred-ui";
import { useForm } from "react-hook-form";

type Props = {
  id: number;
  title: string;
  handleDelete: (id: number) => void;
  handleEdit: (id: number, title: string) => void;
};

const Task: React.FC<Props> = ({ id, title, handleDelete, handleEdit }) => {
  const { register, handleSubmit, errors } = useForm();
  const [isEditting, setIsEditting] = useState<boolean>(false);

  const task = { id, title };

  const startEdit = () => {
    setIsEditting(true);
  };

  const handleApplyEdit = (data: { title: string }) => {
    setIsEditting(false);
    handleEdit(id, data.title);
  };

  return (
    <div>
      {isEditting ? (
        <Card p={3}>
          <input
            name="title"
            type="text"
            // value={task.title}
            // onChange={handleInputChange}
            ref={register({ required: true })}
          ></input>
          <ButtonGroup size="small">
            <Button onClick={handleSubmit(handleApplyEdit)}>適用</Button>
          </ButtonGroup>
        </Card>
      ) : (
        <Card p={3}>
          {task.id}
          {task.title}
          <ButtonGroup size="small">
            <Button onClick={() => startEdit()}>編集</Button>
            <Button onClick={() => handleDelete(task.id)}>削除</Button>
          </ButtonGroup>
        </Card>
      )}
    </div>
  );
};

export default Task;
