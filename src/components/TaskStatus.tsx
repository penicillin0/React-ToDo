import { Table } from "ingred-ui";
import React from "react";
import styled from "styled-components";
import { Todo } from "../types";

type Props = {
  todos: Todo[];
};

const TaskStatus: React.FC<Props> = (props) => {
  const todos = props.todos;
  const finishTodos = todos.filter((todo) => todo.isFinish);
  const notFinishTodos = todos.filter((todo) => !todo.isFinish);
  return (
    <TaskStatusContainer>
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell>未完了のタスク数</Table.HeaderCell>
            <Table.HeaderCell>完了済のタスク数</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <b>{notFinishTodos.length}</b>
            </Table.Cell>
            <Table.Cell>{finishTodos.length}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </TaskStatusContainer>
  );
};

const TaskStatusContainer = styled.div`
  padding-bottom: 3%;
`;

export default TaskStatus;
