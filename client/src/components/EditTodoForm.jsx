import React, { useState } from "react";

const EditTodoForm = ({ editTask, task }) => {
  const [value, setValue] = useState(task.name);
  const handleSubmit = (e) => {
    e.preventDefault();

    editTask(value, task.id);
    setValue("");
  };
  return (
    <>
      <form
        className="flex flex-row justify-center items-center my-2 py-2 max-w-md mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="grow px-1 border border-black"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          required
        />
        <button type="submit" className="ml-2 px-1 border border-black">
          Update Task
        </button>
      </form>
      <hr />
    </>
  );
};

export default EditTodoForm;
