import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import About from "./components/About";
import { useSelector, useDispatch } from "react-redux";
import { logintoggle } from "./actions";

export default function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  const Login = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch(`https://nhhhl.csb.app/tasks`);
    const data = await res.json();

    return data;
  };

  //Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`https://nhhhl.csb.app/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  //Saving the Task
  const addTask = async (task) => {
    const res = await fetch(`https://nhhhl.csb.app/tasks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(task)
    });

    const data = await res.json();
    setTasks([...tasks, data]);
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = {id , ...task}
    // setTasks([...tasks, newTask])
  };

  //Deleting Task
  const deleteTask = async (id) => {
    await fetch(`https://nhhhl.csb.app/tasks/${id}`, {
      method: "DELETE"
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  //Toggling Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`https://nhhhl.csb.app/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updTask)
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        {!Login && <p className="loginmsg">Please Login to use app.</p>}
        {Login ? (
          <button
            className="btn right btnred"
            onClick={() => dispatch(logintoggle())}
          >
            Logout
          </button>
        ) : (
          <button className="btn right" onClick={() => dispatch(logintoggle())}>
            Login
          </button>
        )}
        {Login && (
          <Header
            onAdd={() => setShowAddTask(!showAddTask)}
            showAdd={showAddTask}
          />
        )}
        {Login && (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {showAddTask && <AddTask onAdd={addTask} />}
                  {tasks.length > 0 ? (
                    <Tasks
                      tasks={tasks}
                      onDelete={deleteTask}
                      onToggle={toggleReminder}
                    />
                  ) : (
                    "No Tasks to Display."
                  )}
                </>
              }
            />
            <Route path="/about" element={<About />} />
          </Routes>
        )}
        <Footer />
      </div>
    </Router>
  );
}
