import "todomvc-common";

import React from "react";
import ReactDOM from "react-dom";
import TodoApp from "./TodoApp";

const mountNode = document.getElementById("root");

ReactDOM.render(<TodoApp />, mountNode);
