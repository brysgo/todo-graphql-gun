import TodoTextInput from "./TodoTextInput";

import React from "react";
import gql from "graphql-tag";
import classnames from "classnames";

export default class Todo extends React.Component {
  state = {
    isEditing: false
  };
  static fragments = {
    todo: gql`
      fragment Todo_todo on Todo {
        complete
        text
      }`,
    viewer: gql`
      fragment Todo_viewer on User {
        totalCount,
        completedCount,
      }`
  };
  _handleCompleteChange = e => {
    // const complete = e.target.checked;
    console.log("TODO: change todo status");
    // ChangeTodoStatusMutation.commit(
    //   this.props.relay.environment,
    //   complete,
    //   this.props.todo,
    //   this.props.viewer
    // );
  };
  _handleDestroyClick = () => {
    this._removeTodo();
  };
  _handleLabelDoubleClick = () => {
    this._setEditMode(true);
  };
  _handleTextInputCancel = () => {
    this._setEditMode(false);
  };
  _handleTextInputDelete = () => {
    this._setEditMode(false);
    this._removeTodo();
  };
  _handleTextInputSave = text => {
    this._setEditMode(false);
    console.log("TODO: rename todo mutation");
    // RenameTodoMutation.commit(
    //   this.props.relay.environment,
    //   text,
    //   this.props.todo
    // );
  };
  _removeTodo() {
    console.log("TODO: remove todo mutation");
    // RemoveTodoMutation.commit(
    //   this.props.relay.environment,
    //   this.props.todo,
    //   this.props.viewer
    // );
  }
  _setEditMode = shouldEdit => {
    this.setState({ isEditing: shouldEdit });
  };
  renderTextInput() {
    return (
      <TodoTextInput
        className="edit"
        commitOnBlur={true}
        initialValue={this.props.todo.text}
        onCancel={this._handleTextInputCancel}
        onDelete={this._handleTextInputDelete}
        onSave={this._handleTextInputSave}
      />
    );
  }
  render() {
    return (
      <li
        className={classnames({
          completed: this.props.todo.complete,
          editing: this.state.isEditing
        })}
      >
        <div className="view">
          <input
            checked={this.props.todo.complete}
            className="toggle"
            onChange={this._handleCompleteChange}
            type="checkbox"
          />
          <label onDoubleClick={this._handleLabelDoubleClick}>
            {this.props.todo.text}
          </label>
          <button className="destroy" onClick={this._handleDestroyClick} />
        </div>
        {this.state.isEditing && this.renderTextInput()}
      </li>
    );
  }
}
