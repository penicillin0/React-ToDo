import { reducerWithInitialState } from "typescript-fsa-reducers";
import { addTodo, deleteTodo } from "../actions";
import { Todo } from "../../../types";

type TodoState = {
  todos: Todo[];
};

const initialState: TodoState = {
  todos: [],
};

export const todoReducer = reducerWithInitialState(initialState)
  .case(addTodo, (state, addindTodo: Todo) => ({
    ...state,
    allTodos: state.todos.concat(addindTodo),
  }))
  .case(deleteTodo, (state, deleteTodoNumber: number) => ({
    ...state,
    allTodos: state.todos.filter((todo) => todo.id !== deleteTodoNumber),
  }));
