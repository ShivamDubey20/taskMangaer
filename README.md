# Task Manager Application

A magical task manager application to organize tasks for users of all ages! Built using React, Redux Toolkit, and styled with Tailwind CSS, this application allows users to add, view, edit, delete, and organize tasks with ease.

## Features

- **Add New Tasks:** Add tasks with titles, descriptions, and statuses.
- **Edit and Delete Tasks:** Update task details or remove tasks from the list.
- **Search and Filter Tasks:** Search tasks by titles or descriptions and filter them by status.
- **Progress Tracking:** Visualize task completion progress with a dynamic progress bar.
- **Dark Mode Support:** Toggle between light and dark themes for better usability.
- **Drag-and-Drop Functionality:** Reorder tasks seamlessly using drag-and-drop.
- **External API Integration:** Fetch initial tasks from a JSONPlaceholder API.

## Project Structure

- **components/**
  - `AddTask.js`: Component to add new tasks.
  - `TaskList.js`: Component to display and manage the task list.
- **features/**
  - `taskSlice.js`: Redux slice for managing tasks.
- **App.js**: Root component that integrates `AddTask` and `TaskList`.
- **package.json**: Project configuration and dependencies.

## Prerequisites

- Node.js (>=14.x)
- npm (>=6.x)

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

   The application will run locally at `http://localhost:3000`.

## Key Commands

- **Start Development Server:** `npm start`
- **Build for Production:** `npm run build`
- **Run Tests:** `npm test`

## Dependencies

- React 19.x
- Redux Toolkit
- Tailwind CSS
- React Beautiful DnD
- Framer Motion
- UUID

## API Integration

Tasks are fetched from [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API, with a limit of 7 tasks for demonstration purposes.

## Screenshots

--**Task Manager(Light Mode):**  
![Header Section](https://raw.githubusercontent.com/ShivamDubey20/taskMangaer/be6a804f0374b9bd7be207c411e7ef58b12de5d3/Screenshot%20(50).png)

![Task Manager Section](https://github.com/ShivamDubey20/taskMangaer/blob/main/Screenshot%20(51).png?raw=true)

--**This is how you can Add Task :**
![Add Task Section](https://github.com/ShivamDubey20/taskMangaer/blob/main/Screenshot%20(54).png?raw=true)


## Future Enhancements

- Add user authentication for personalized task management.
- Implement priority levels for tasks.
- Add due dates and reminders for tasks.

