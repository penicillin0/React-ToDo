import actionCreatorFactory from "typescript-fsa";
const actionCreator = actionCreatorFactory("todo");

export const addTodo = actionCreator<string>("ADD_TODO");
export const deleteTodo = actionCreator<number>("DELETE_TODO");
export const editTodo = actionCreator<{ id: number; title: string }>(
  "EDIT_TODO"
);
