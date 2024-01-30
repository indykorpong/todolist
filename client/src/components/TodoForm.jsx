import React, { useState } from "react";

const TodoForm = ({ addTask }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addTask(value);
    setValue("");
  };

  return (
    <form
      className="flex flex-row justify-center items-center my-2 py-2 max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="grow px-1 border border-black"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      <button type="submit" className="ml-2 px-1 border border-black">
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
