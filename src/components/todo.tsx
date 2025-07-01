import { addData, removeData, toggleTask } from "@/lib/state-manegment";
import { RootState } from "@/lib/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Todo = () => {
  const [input, setInput] = useState("");
  const data = useSelector((state: RootState) => state.data.data);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      alert("Please enter a task");
      return;
    }
    const newTask = {
      id: Date.now(),
      task: input,
      completed: false,
    };
    dispatch(addData(newTask));
    setInput("");
  };

  const notCompletedCount = data.filter((item) => !item.completed).length;
  console.log("Not completed tasks count:", notCompletedCount);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4">
        Todo List Not completed {notCompletedCount}
      </h1>
      <form
        className="flex flex-col max-w-md mx-auto my-4"
        onSubmit={handleSubmit}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Add a new task"
          className="border p-2 rounded w-full mb-4"
        />
        <button type="submit" className="bg-blue-500 text-black p-2 rounded">
          Add Task
        </button>
      </form>
      <div>
        {data.length > 0 && (
          <ul className="max-w-md mx-auto">
            {data.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border p-2 mb-2 rounded"
              >
                {item.task}
                <button
                  onClick={() => dispatch(toggleTask(item.id))}
                  className={`${
                    item.completed ? "bg-green-500" : "bg-yellow-500"
                  } text-black p-1 rounded`}
                >
                  {item.completed ? "Completed" : "Not Completed"}
                </button>
                <button
                  onClick={() => {
                    dispatch(removeData(item.id));
                  }}
                  className="bg-red-500 text-black p-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
