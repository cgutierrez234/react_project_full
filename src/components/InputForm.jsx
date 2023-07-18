const InputForm = ({ userInput, setTasks, text, setText }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setText("");

    const createTask = async () => {
      const response = await fetch(
        "https://react-project-full.onrender.com/tasks",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ task: text }),
        }
      );
      const data = await response.json();
      setTasks(data);
    };
    createTask();
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="textInput"
        onChange={handleChange}
        value={text}
        ref={userInput}
      />
      <input type="submit" id="submitBtn" />
    </form>
  );
};

export default InputForm;
