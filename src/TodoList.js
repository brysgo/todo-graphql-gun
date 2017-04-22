import gql from "graphql-tag";
import Todo from "./Todo";

import React from "react";

export default class TodoList extends React.Component {
  static fragments = {
    viewer: gql`
      fragment TodoList_viewer on User {
        todos {
          edges(type: Set) {
            node {
              id,
              complete,
              ...Todo_todo,
            },
          },
        },
        id,
        totalCount,
        completedCount,
        ...Todo_viewer,
      }
      ${Todo.fragments.viewer}
      ${Todo.fragments.todo}
    `
  };
  _handleMarkAllChange = e => {
    // const complete = e.target.checked;
    console.log("TODO: mark all todos mutation");
    // MarkAllTodosMutation.commit(
    //   this.props.relay.environment,
    //   complete,
    //   this.props.viewer.todos,
    //   this.props.viewer
    // );
  };
  renderTodos() {
    const viewer = this.props.viewer || { todos: { edges: [] } };
    return viewer.todos.edges.map(edge => (
      <Todo key={edge.node.id} todo={edge.node} viewer={this.props.viewer} />
    ));
  }
  render() {
    const viewer = this.props.viewer || {};
    const numTodos = viewer.totalCount;
    const numCompletedTodos = viewer.completedCount;
    return (
      <section className="main">
        <input
          checked={numTodos === numCompletedTodos}
          className="toggle-all"
          onChange={this._handleMarkAllChange}
          type="checkbox"
        />
        <label htmlFor="toggle-all">
          Mark all as complete
        </label>
        <ul className="todo-list">
          {this.renderTodos()}
        </ul>
      </section>
    );
  }
}
