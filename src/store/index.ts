import { createStore } from "redux";
import { todoReducer, TodoState } from "./todo/reducers";

export function cofigureStore() {
  const store = createStore(todoReducer);
  return store;
}

export type RootState = TodoState;
