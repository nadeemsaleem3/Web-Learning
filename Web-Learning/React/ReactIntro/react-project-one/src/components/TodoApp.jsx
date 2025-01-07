import './TodoApp.css';
import { useState } from 'react';

const TodoApp = () => {

    const [tasks, setTasks] = useState([]); // State for storing tasks
    const [input, setInput] = useState(""); // State for the input field

     // Add a new task
   const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, input.trim()]);
      setInput(""); // Clear the input field
    }
  };

  // Remove a task
  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };


  return (
    <div>
        <h1>To-Do App</h1>
          <div className="task-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a task"
            />
            <button onClick={addTask}>Add Task</button>
          </div>
          <ul className="task-list" >
            {tasks.map((task, index) => (
            <li key={index}>
              {task}
              <button onClick={() => removeTask(index)}>Remove</button>
            </li>
            ))}
          </ul>
    </div>
  )
}

export default TodoApp