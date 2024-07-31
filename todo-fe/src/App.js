import { Button, Form, Input } from "antd";
import "./App.css";
import { Todo } from "./components/todo/todo";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [form] = Form.useForm();
  const [todoList, setTodoList] = useState([]);
  console.log("env", process.env.REACT_APP_API_BASE_URL);
  const handleTodoList = async () => {
    await axios
      .get(process.env.REACT_APP_API_BASE_URL + "/todoList")
      .then((res) => setTodoList(res?.data));
  };
  useEffect(() => {
    handleTodoList();
  }, []);
  const handleSubmit = (values) => {
    const payload = {
      todo: values.name,
    };
    axios
      .post(process.env.REACT_APP_API_BASE_URL + "/addTodo", payload)
      .then(() => {
        form.resetFields();
        handleTodoList();
      });
  };
  return (
    <div className="App">
      <h3>TODO</h3>
      <Form form={form} onFinish={handleSubmit} className="todo-form">
        <Form.Item name="name">
          <Input />
        </Form.Item>
        <Button htmlType="submit">ADD</Button>
      </Form>
      <Todo todoList={todoList} handleTodoList={handleTodoList} />
    </div>
  );
}

export default App;
