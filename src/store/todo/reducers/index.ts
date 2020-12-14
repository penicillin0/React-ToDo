import { reducerWithInitialState } from "typescript-fsa-reducers";
import { addTodo, checkTodo, deleteTodo, editTodo } from "../actions";
import { Todo } from "../../../types";

export type TodoState = {
  nextId: number;
  todos: Todo[];
};

const getInitialFromLocal = () => {
  if (localStorage.getItem("local") === null) {
    return {
      nextId: 0,
      todos: [],
    };
  } else {
    return {
      nextId: Number(
        JSON.parse(localStorage.getItem("local") as string).nextId
      ),
      todos: JSON.parse(localStorage.getItem("local") as string).todos,
    };
  }
};
const initialState: TodoState = getInitialFromLocal();

console.log("ini");
console.log(initialState);

export const todoReducer = reducerWithInitialState(initialState)
  .case(addTodo, (state, addindTodo) => {
    const newState = {
      ...state,
      nextId: state.nextId + 1,
      todos: state.todos.concat({
        id: state.nextId,
        title: addindTodo,
        isFinish: false,
      }),
    };
    console.log(newState);
    console.log(JSON.stringify(newState));
    localStorage.setItem("local", JSON.stringify(newState));
    return newState;
  })
  .case(deleteTodo, (state, deleteTodoNumber) => {
    const newState = {
      ...state,
      todos: state.todos.filter((todo) => todo.id !== deleteTodoNumber),
    };
    localStorage.setItem("local", JSON.stringify(newState));
    return newState;
  })
  .case(editTodo, (state, { id, title }) => {
    const newState = {
      ...state,
      todos: state.todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        } else {
          return { id: id, title: title, isFinish: false };
        }
      }),
    };
    localStorage.setItem("local", JSON.stringify(newState));
    return newState;
  })
  .case(checkTodo, (state, id) => {
    const newState = {
      ...state,
      todos: state.todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        } else {
          return { id: id, title: todo.title, isFinish: !todo.isFinish };
        }
      }),
    };
    localStorage.setItem("local", JSON.stringify(newState));
    return newState;
  });
