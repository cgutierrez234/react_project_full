const SelectedTaskItem = ({
  task,
  setCurrentTask,
  setTasks,
  userInput,
  setText,
}) => {
  const resetCurrentTask = () => {
    setCurrentTask(null);
  };
  const updateTask = async () => {
    const id = task.id;
    const response = await fetch(
      `https://react-project-full.onrender.com/tasks/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ task: userInput.current.value }),
      }
    );

    const data = await response.json();
    setText("");
    setTasks(data);
    resetCurrentTask();
  };
  const deleteTask = async () => {
    const id = task.id;
    const response = await fetch(
      `https://react-project-full.onrender.com/tasks/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();
    setTasks(data);
    resetCurrentTask();
  };

  return (
    <>
      <div className="card" id={task.id}>
        <h1>{task.task}</h1>
        <button onClick={updateTask}>Update</button>
        <button onClick={deleteTask}>Delete</button>
        <button onClick={resetCurrentTask}>Back</button>
      </div>
    </>
  );
};

export default SelectedTaskItem;
