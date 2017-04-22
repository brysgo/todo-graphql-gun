import gql from "graphql-tag";
import React from "react";

export default class TodoListFooter extends React.Component {
  static fragments = {
    viewer: gql`
      fragment TodoListFooter_viewer on User {
        id,
        completedCount,
        completedTodos: todos(
          status: "completed",
          first: 2147483647  # max GraphQLInt
        ) {
          edges {
            node {
              id
              complete
            }
          }
        },
        totalCount,
      }
    `
  };
  _handleRemoveCompletedTodosClick = () => {
    console.log("FIXME: remove completed todos");
    // RemoveCompletedTodosMutation.commit(
    //   this.props.relay.environment,
    //   this.props.viewer.completedTodos,
    //   this.props.viewer
    // );
  };
  render() {
    const numCompletedTodos = this.props.viewer.completedCount;
    const numRemainingTodos = this.props.viewer.totalCount - numCompletedTodos;
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{numRemainingTodos}</strong>
          {" "}
          item
          {numRemainingTodos === 1 ? "" : "s"}
          {" "}
          left
        </span>
        {numCompletedTodos > 0 &&
          <button
            className="clear-completed"
            onClick={this._handleRemoveCompletedTodosClick}
          >
            Clear completed
          </button>}
      </footer>
    );
  }
}
