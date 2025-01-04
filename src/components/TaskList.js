import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodo, deleteTask, updateTask } from "../features/taskSlice";
import { motion, AnimatePresence } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskList = () => {
    const tasks = useSelector((state) => state.task.tasks);
    const loading = useSelector((state) => state.task.loading);
    const error = useSelector((state) => state.task.error);
    const dispatch = useDispatch();

    const [filter, setFilter] = useState("All");
    const [editTaskId, setEditTaskId] = useState(null);
    const [editValues, setEditValues] = useState({
        title: "",
        description: "",
        status: "Pending",
        priority: "Low",
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        dispatch(fetchTodo());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteTask(id));
    };

    const handleEdit = (id, title, description, status, priority) => {
        setEditTaskId(id);
        setEditValues({ title, description, status, priority });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = (id) => {
        if (!editValues.title.trim()) {
            alert("Task title cannot be empty.");
            return;
        }
        dispatch(updateTask({ id, ...editValues }));
        setEditTaskId(null);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredTasks = useMemo(() => {
        return tasks
            .filter((task) => task.status === (filter === "All" ? task.status : filter))
            .filter(
                (task) =>
                    task.title.toLowerCase().includes(searchTerm) ||
                    task.description.toLowerCase().includes(searchTerm)
            );
    }, [tasks, filter, searchTerm]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedTasks = Array.from(tasks);
        const [removed] = reorderedTasks.splice(result.source.index, 1);
        reorderedTasks.splice(result.destination.index, 0, removed);
        // Update the store with reordered tasks
        dispatch(updateTask({ reorderedTasks }));
    };

    const completedTasks = tasks.filter((task) => task.status === "Completed").length;
    const progressPercentage = tasks.length
        ? Math.round((completedTasks / tasks.length) * 100)
        : 0;

    return (
        <div
            className={`container mx-auto mt-12 px-6 pb-12 rounded-3xl border-8 shadow-2xl ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-b from-yellow-50 to-yellow-200 text-gray-800"}`}
        >
            {/* Header */}
            <div className="text-center mb-10">
                <h2 className="text-5xl font-bold text-blue-600 mb-4 pt-8">
                    🎨 Task Adventure Zone 🎨
                </h2>
                <p className="text-lg text-blue-400">
                    Organize your tasks while exploring a world of creativity!
                </p>
            </div>

            {/* Dark Mode Toggle */}
            <div className="flex justify-end mb-6">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition transform hover:scale-110 ${darkMode
                        ? "bg-blue-600 text-white"
                        : "bg-yellow-300 text-black hover:bg-yellow-400"
                        }`}
                    aria-label="Toggle dark mode"
                >
                    {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
                </button>
            </div>

            {/* Search Bar */}
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="🔍 Search for your tasks here..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full max-w-md px-5 py-3 border border-blue-400 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 bg-white text-gray-700"
                    aria-label="Search tasks"
                />
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
                <div className="text-center text-lg font-semibold mb-2 text-blue-600">
                    Adventure Progress: {progressPercentage}% 🚀
                </div>
                <div className={`w-full ${darkMode ? "bg-gray-700" : "bg-gray-300"} rounded-full h-6 shadow-md overflow-hidden`}>
                    <div
                        className="bg-blue-500 h-6 rounded-full transition-all"
                        style={{ width: `${progressPercentage}%` }}
                        aria-label={`Progress: ${progressPercentage}%`}
                    ></div>
                </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex justify-center gap-4 mb-6">
                {["All", "Pending", "In Progress", "Completed"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-6 py-3 rounded-full text-sm font-medium shadow-md transform hover:scale-110 ${filter === status
                            ? "bg-blue-500 text-white"
                            : "bg-yellow-300 text-gray-800 hover:bg-yellow-400"
                            }`}
                        aria-label={`Filter tasks: ${status}`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Task Cards */}
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="tasks">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            <AnimatePresence>
                                {filteredTasks.map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                        {(provided) => (
                                            <motion.div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 20 }}
                                                transition={{ duration: 0.4 }}
                                                className="bg-white shadow-xl rounded-2xl p-6 border-4 border-blue-200 hover:shadow-2xl hover:scale-105 transition-transform flex flex-col justify-between"
                                            >
                                                {editTaskId === task.id ? (
                                                    <>
                                                        {/* Inline Edit Form */}
                                                        <div>
                                                            <input
                                                                name="title"
                                                                value={editValues.title}
                                                                onChange={handleEditChange}
                                                                className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md text-lg"
                                                                placeholder="Task Title"
                                                                aria-label="Edit task title"
                                                            />
                                                            <textarea
                                                                name="description"
                                                                value={editValues.description}
                                                                onChange={handleEditChange}
                                                                className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md text-lg"
                                                                placeholder="Task Description"
                                                                aria-label="Edit task description"
                                                            />
                                                            <select
                                                                name="status"
                                                                value={editValues.status}
                                                                onChange={handleEditChange}
                                                                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md text-lg"
                                                                aria-label="Edit task status"
                                                            >
                                                                <option value="Pending">Pending</option>
                                                                <option value="In Progress">In Progress</option>
                                                                <option value="Completed">Completed</option>
                                                            </select>
                                                        </div>

                                                        <div className="flex justify-between">
                                                            <button
                                                                onClick={() => handleEditSubmit(task.id)}
                                                                className="px-6 py-2 bg-green-400 text-black text-sm font-medium rounded-lg shadow hover:bg-green-500 transition"
                                                                aria-label="Save task"
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                onClick={() => setEditTaskId(null)}
                                                                className="px-6 py-2 bg-gray-400 text-black text-sm font-medium rounded-lg shadow hover:bg-gray-500 transition"
                                                                aria-label="Cancel edit"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        {/* Task Icon */}
                                                        <div className="flex items-center justify-center mb-4">
                                                            <span className="text-6xl">
                                                                {task.status === "Completed"
                                                                    ? "🏆"
                                                                    : task.status === "In Progress"
                                                                        ? "🚀"
                                                                        : "💡"}
                                                            </span>
                                                        </div>

                                                        {/* Task Title */}
                                                        <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
                                                            {task.title}
                                                        </h3>

                                                        {/* Task Description */}
                                                        {task.description && (
                                                            <p className="text-md text-gray-600 mb-4 text-center">
                                                                {task.description}
                                                            </p>
                                                        )}

                                                        {/* Task Status */}
                                                        <div className="flex justify-center items-center mb-6">
                                                            <span
                                                                className={`px-3 py-1 text-lg font-medium rounded-full ${task.status === "Completed"
                                                                    ? "bg-green-200 text-green-700"
                                                                    : task.status === "In Progress"
                                                                        ? "bg-blue-200 text-blue-700"
                                                                        : "bg-red-200 text-red-700"
                                                                    }`}
                                                            >
                                                                {task.status}
                                                            </span>
                                                        </div>

                                                        {/* Action Buttons */}
                                                        <div className="flex justify-between items-center">
                                                            <button
                                                                onClick={() => handleDelete(task.id)}
                                                                className="px-6 py-2 bg-red-400 text-black text-sm font-medium rounded-lg shadow hover:bg-red-500 transition"
                                                                aria-label="Delete task"
                                                            >
                                                                Delete
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleEdit(task.id, task.title, task.description, task.status)
                                                                }
                                                                className="px-6 py-2 bg-blue-400 text-black text-sm font-medium rounded-lg shadow hover:bg-blue-500 transition"
                                                                aria-label="Edit task"
                                                            >
                                                                Edit
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </motion.div>
                                        )}
                                    </Draggable>
                                ))}
                            </AnimatePresence>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default TaskList;
