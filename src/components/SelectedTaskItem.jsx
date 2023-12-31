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
        <div id="btnDiv">
          <button onClick={updateTask} id="updateBtn">
            Update
          </button>
          <button onClick={deleteTask} id="deleteBtn">
            Delete
          </button>
          <button onClick={resetCurrentTask} id="backBtn">
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default SelectedTaskItem;
