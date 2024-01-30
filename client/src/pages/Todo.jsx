import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import instance from "../api/axios";

import TaskCard from "../components/TaskCard";
import TodoForm from "../components/TodoForm";
import EditTodoForm from "../components/EditTodoForm";

const Todo = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    instance
      .get("/tasks")
      .then((res) => {
        const sortedTasks = res.data.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        const formattedTasks = sortedTasks.map((task) => {
          return {
            task_id: task.task_id,
            name: task.name,
            completed: task.completed,
            isEditing: false,
          };
        });

        setTasks(formattedTasks);
      })
      .catch((err) => console.log(err));
  }, []);

  const addTask = (value) => {
    const task = {
      task_id: uuidv4(),
      name: value,
      completed: false,
      isEditing: false,
    };
    setTasks([...tasks, task]);

    instance
      .post("/tasks", task)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const toggleComplete = (id) => {
    const newTasks = tasks.map((task) =>
      task.task_id === id ? { ...task, completed: !task.completed } : task
    );

    setTasks(newTasks);

    instance
      .put(
        `/tasks/${id}`,
        newTasks.find((task) => task.task_id === id)
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const markEditing = (id) => {
    setTasks(
      tasks.map((task) =>
        task.task_id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.task_id !== id));

    instance
      .delete(`/tasks/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const editTask = (value, id) => {
    const newTasks = tasks.map((task) =>
      task.task_id === id ? { ...task, name: value, isEditing: false } : task
    );
    setTasks(newTasks);

    instance
      .put(
        `/tasks/${id}`,
        newTasks.find((task) => task.task_id === id)
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
