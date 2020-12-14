import { combineReducers } from "redux";
import { todoReducer } from "./todo/reducers";

export const createRootReducer = () =>
  combineReducers({
    todos: todoReducer,
  });
