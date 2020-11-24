import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../store";
import { addTodo } from "../../store/todo/actions";
import { Todo } from "../../types";
import { TaskList as Component } from "./TaskList";

const mapStateToProps = (state: RootState) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addTodo: (todo: Todo) => dispatch(addTodo(todo)),
    // deleteTodo: ()
  };
};

export const TaskList = connect(mapStateToProps, mapDispatchToProps)(Component);
