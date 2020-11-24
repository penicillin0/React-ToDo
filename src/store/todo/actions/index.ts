import actionCreatorFactory from "typescript-fsa";
import { Todo } from "../../../types";
const actionCreator = actionCreatorFactory("todo");

export const addTodo = actionCreator<Todo>("ADD_TODO");
export const deleteTodo = actionCreator<number>("DELETE_TODO");
