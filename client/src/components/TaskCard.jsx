import React from "react";
import {
  PencilSimpleLine,
  Trash,
  Circle,
  CheckCircle,
} from "@phosphor-icons/react";

const TaskCard = ({ task, toggleComplete, handleEdit, handleDelete }) => {
  const lineThrough = task.completed ? "line-through" : "no-underline";
  const icon = task.completed ? (
    <CheckCircle size={20} />
  ) : (
    <Circle size={20} />
  );

  return (
    <>
      <div className="flex flex-row justify-center items-center my-2 py-2 max-w-md mx-auto">
        <button onClick={() => toggleComplete(task.id)}>{icon}</button>
        <div className={"grow ml-2 " + lineThrough}>{task.name}</div>
        <PencilSimpleLine
          className="mx-1 hover:cursor-pointer"
          size={20}
          onClick={() => handleEdit(task.id)}
        />
        <Trash
          className="mx-1 hover:cursor-pointer"
          size={20}
          onClick={() => handleDelete(task.id)}
        />
      </div>
      <hr />
    </>
  );
};

export default TaskCard;
