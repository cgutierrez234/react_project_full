import { useState, useEffect, useRef } from "react";
import Tasks from "./components/Tasks";
import InputForm from "./components/InputForm";
import SelectedTaskItem from "./components/SelectedTaskItem";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const userInput = useRef();

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();
      setTasks(data);
    };
    getData();
  }, [tasks]);
  return (
    <>
      <InputForm userInput={userInput} setTasks={setTasks} />
      {currentTask ? (
        <SelectedTaskItem
          task={currentTask}
          setCurrentTask={setCurrentTask}
          setTasks={setTasks}
          userInput={userInput}
        />
      ) : (
        <Tasks tasks={tasks} setCurrentTask={setCurrentTask} />
      )}
    </>
  );
}

export default App;
