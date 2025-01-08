import { useReducer } from "react";

// Define the initial state
const initialState = {
  name: "",
  email: "",
  age: "",
  submitted: false,
};

// Define the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "RESET_FORM":
      return { ...initialState };
    case "SUBMIT_FORM":
      return {
        ...state,
        submitted: true,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const FormWithUseReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });
  };

  const handleReset = () => {
    dispatch({ type: "RESET_FORM" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SUBMIT_FORM" });
  };

  return (
    <div>
      <h1>Form with useReducer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={state.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={state.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={state.age}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
      {state.submitted && (
        <div>
          <h2>Form Submitted</h2>
          <p>Name: {state.name}</p>
          <p>Email: {state.email}</p>
          <p>Age: {state.age}</p>
        </div>
      )}
    </div>
  );
};

export default FormWithUseReducer;