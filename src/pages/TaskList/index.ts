import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../store";
import { addTodo, deleteTodo } from "../../store/todo/actions";
import { TaskList as Component } from "./TaskList";

const mapStateToProps = (state: RootState) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addTodo: (todo: string) => dispatch(addTodo(todo)),
    deleteTodo: (id: number) => dispatch(deleteTodo(id)),
  };
};

export const TaskList = connect(mapStateToProps, mapDispatchToProps)(Component);
