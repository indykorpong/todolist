import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import instance from "../api/axios";

import TaskCard from "../components/TaskCard";
import TodoForm from "../components/TodoForm";
import EditTodoForm from "../components/EditTodoForm";

const Todo = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (value) => {
    const task = {
      id: uuidv4(),
      name: value,
      completed: false,
      isEditing: false,
    };
    setTasks([...tasks, task]);

    instance
      .post("/todos", task)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

    instance
      .put(
        `/todos/${id}`,
        tasks.find((task) => task.id === id)
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const markEditing = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));

    instance
      .delete(`/todos/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const editTask = (value, id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, name: value, isEditing: false } : task
      )
    );

    instance
      .put(
        `/todos/${id}`,
        tasks.find((task) => task.id === id)
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <TodoForm addTask={addTask} />
      <div>
        {tasks.map((task, index) => {
          return task.isEditing ? (
            <EditTodoForm editTask={editTask} task={task} key={index} />
          ) : (
            <TaskCard
              task={task}
              key={index}
              toggleComplete={toggleComplete}
              handleDelete={deleteTask}
              handleEdit={markEditing}
            />
          );
        })}
      </div>
    </>
  );
};

export default Todo;
