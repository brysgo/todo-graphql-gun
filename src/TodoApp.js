import React from "react";
import gql from "graphql-tag";
import TodoList from "./TodoList";
import TodoListFooter from "./TodoListFooter";
import TodoTextInput from "./TodoTextInput";

import gun from "./gun";

const { graphqlGun } = require("graphql-gun/react")({
  React,
  gun: gun.get("todo_app")
});

class TodoApp extends React.Component {
  _handleTextInputSave = text => {
    this.todoId = this.todoId + 1 || 0;
    gun.get("todo_app").on((...args) => console.log(args));
    const todo = gun.get("todo_app").put({
      [`todo_${this.todoId}`]: {
        node: {
          id: this.todoId,
          complete: false,
          text
        }
      }
    });
    gun
      .get("todo_app")
      .get("todo_0")
      .get("node")
      .get("text")
      .on((...args) => console.log({ args }));
    const todos = gun.get("todo_app").put({ todos: { edges: {} } });
    todos.get("todos").get("edges").set(todo);
    // AddTodoMutation.commit(this.props.relay.environment, text, this.props.data);
  };
  render() {
    console.log("props: ", this.props);
    const hasTodos = false && (this.props.data || {}).totalCount > 0;
    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <h1>
              todos
            </h1>
            <TodoTextInput
              autoFocus={true}
              className="new-todo"
              onSave={this._handleTextInputSave}
              placeholder="What needs to be done?"
            />
          </header>
          <TodoList />
          {hasTodos && <TodoListFooter viewer={this.props.data} />}
        </section>
        <footer className="info">
          <p>
            Double-click to edit a todo
          </p>
          <p>
            Created by
            {" "}
            <a href="https://www.github.com/brysgo">
              @brysgo
            </a>
          </p>
          <p>
            Modified from project by the
            {" "}
            <a href="https://facebook.github.io/relay/">
              Relay team
            </a>
          </p>
          <p>
            Part of <a href="http://todomvc.com">TodoMVC</a>
          </p>
        </footer>
      </div>
    );
  }
}

export default graphqlGun(
  gql`
    query {
      totalCount
      ...TodoListFooter_viewer
      ...TodoList_viewer
    }
    ${TodoList.fragments.viewer}
    ${TodoListFooter.fragments.viewer}
  `
)(TodoApp);
