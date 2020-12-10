import { reducerWithInitialState } from "typescript-fsa-reducers";
import { addTodo, deleteTodo, editTodo } from "../actions";
import { Todo } from "../../../types";

export type TodoState = {
  nextId: number;
  todos: Todo[];
};

const initialState: TodoState = {
  nextId: 0,
  todos: [],
};

export const todoReducer = reducerWithInitialState(initialState)
  .case(addTodo, (state, addindTodo) => ({
    ...state,
    nextId: state.nextId + 1,
    todos: state.todos.concat({
      id: state.nextId,
      title: addindTodo,
    }),
  }))
  .case(deleteTodo, (state, deleteTodoNumber) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== deleteTodoNumber),
  }))
  .case(editTodo, (state, { id, title }) => {
    return {
      ...state,
      todos: state.todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        } else {
          return { id: id, title: title };
        }
      }),
    };
  });
