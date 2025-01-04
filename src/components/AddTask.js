import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTask } from "../features/taskSlice";

const AddTask = ({ closeModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { id: uuidv4(), title, description, status };
    dispatch(addTask(newTask));
    setTitle("");
    setDescription("");
    setStatus("");
    closeModal(); // Close modal after adding a task
  };

  return (
    <div className="container mx-auto my-8 bg-gradient-to-r from-green-200 via-yellow-200 to-blue-200 p-8 shadow-2xl rounded-3xl border-4 border-blue-400">
      <h2 className="text-4xl font-extrabold text-blue-800 mb-8 text-center drop-shadow-md">
        🎨 Add a New Task 🎨
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Task Title */}
        <input
          type="text"
          placeholder="💡 Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-6 py-4 text-xl border border-blue-400 rounded-full focus:ring-4 focus:ring-blue-300 focus:outline-none bg-white text-gray-900 shadow-lg"
        />

        {/* Task Description */}
        <textarea
          placeholder="📝 Task Description"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-6 py-4 text-xl border border-blue-400 rounded-xl focus:ring-4 focus:ring-blue-300 focus:outline-none bg-white text-gray-900 shadow-lg"
        />

        {/* Task Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          className="w-full px-6 py-4 text-xl border border-blue-400 rounded-full focus:ring-4 focus:ring-blue-300 focus:outline-none bg-white text-gray-900 shadow-lg"
        >
          <option value="" disabled className="text-gray-400">
            🎯 Select the status
          </option>
          <option value="Pending">⏳ Pending</option>
          <option value="In Progress">🚀 In Progress</option>
          <option value="Completed">✅ Completed</option>
        </select>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-300 text-gray-800 text-2xl font-semibold py-4 px-6 rounded-full hover:bg-gray-400 shadow-xl transition-transform transform hover:scale-105"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white text-2xl font-semibold py-4 px-6 rounded-full hover:bg-blue-600 shadow-xl transition-transform transform hover:scale-105"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
