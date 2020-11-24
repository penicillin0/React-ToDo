import { createStore } from "redux";
import { createRootReducer } from "./reducer";

export function cofigureStore() {
  const store = createStore(createRootReducer());
  return store;
}

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;
