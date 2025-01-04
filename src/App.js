import React, { useState } from "react";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center">
      <header className="text-center mb-12">
        <h1 className="text-6xl font-extrabold text-purple-800 drop-shadow-lg tracking-wider">
          🌟 Task Manager 🌟
        </h1>
        <p className="text-purple-600 mt-4 text-2xl font-light">
          A magical place to organize tasks for kids and adults alike!
        </p>
      </header>

      <button
        onClick={toggleModal}
        className="fixed bottom-6 right-6 bg-pink-500 text-white text-xl font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-pink-600 transform transition-transform hover:scale-105 focus:outline-none"
      >
        ➕ Add Task
      </button>

      {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Add New Task</h2>
        <button
          onClick={toggleModal}
          className="text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          ✖️
        </button>
      </div>
      <AddTask closeModal={toggleModal} />
    </div>
  </div>
)}

      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl p-8 border-t-8 border-blue-400">
        <TaskList />
      </div>

      <footer className="mt-12 text-gray-600">
        <p className="text-center text-sm">Made with ❤️ for dreamers of all ages!</p>
      </footer>
    </div>
  );
}

export default App;
