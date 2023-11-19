import React, { useState } from "react";
import axios from "axios";

const Create = () => {
  const [task, setTask] = useState("");

  const handleAddTodo = () => {
    axios
      .post("http://localhost:5000/add", { task: task })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <input
        type="text"
        placeholder="Add Todo here"
        style={{
          flex: "1",
          marginRight: "5px",
          padding: "5px",
          borderRadius: "3px",
          border: "1px solid #ccc",
          fontFamily: "monospace",
        }}
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          marginRight: "5px",
          padding: "5px 10px",
          borderRadius: "3px",
          border: "none",
          cursor: "pointer",
        }}
        onClick={handleAddTodo}
      >
        ADD
      </button>
    </div>
  );
};

export default Create;
