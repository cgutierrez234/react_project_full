import { useState, useEffect, useRef } from "react";
import Tasks from "./components/Tasks";
import InputForm from "./components/InputForm";
import SelectedTaskItem from "./components/SelectedTaskItem";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [text, setText] = useState("");
  const userInput = useRef();

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://react-project-full.onrender.com/tasks");
      const data = await res.json();
      setTasks(data);
    };
    getData();
  }, [tasks]);
  return (
    <>
      <InputForm
        userInput={userInput}
        setTasks={setTasks}
        text={text}
        setText={setText}
      />
      {currentTask ? (
        <SelectedTaskItem
          task={currentTask}
          setCurrentTask={setCurrentTask}
          setTasks={setTasks}
          userInput={userInput}
          setText={setText}
        />
      ) : (
        <Tasks tasks={tasks} setCurrentTask={setCurrentTask} />
      )}
    </>
  );
}

export default App;
