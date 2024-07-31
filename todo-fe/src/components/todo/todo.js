import { Button } from "antd";
import axios from "axios";
import React from "react";
import "./todo.css";

export const Todo = ({ todoList, handleTodoList }) => {
  console.log(todoList);
  const handleDelete = (id) => {
    axios
      .delete(`https://todo-apllication-server.vercel.app/deleteTodo/${id}`)
      .then(() => {
        handleTodoList();
      });
  };
  return (
    <div className="todo-list">
      {todoList?.map((todo) => (
        <div key={todo?._id} className="todo-item">
          <p>{todo?.todo}</p>
          <Button onClick={() => handleDelete(todo?._id)}>Delete</Button>
        </div>
      ))}
    </div>
  );
};
