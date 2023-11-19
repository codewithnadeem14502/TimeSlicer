import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { FaCheckSquare } from "react-icons/fa";

function Home() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodoId, setEditingTodoId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/get")
      .then((result) => setTodos(result.data))
      .catch((error) => console.log(error));
  }, [todos, task]);

  const handleUpdate = (id) => {
    axios
      .put(`http://localhost:5000/edit/${id}`, { task: task })
      .then((result) => console.log(result.data))
      .catch((error) => console.log(error));
    setEditingTodoId(null);
  };

  const handleCheck = (id, done) => {
    axios
      .put(`http://localhost:5000/update/${id}`, { done: !done })
      .then((result) => console.log(result.data))
      .catch((error) => console.log(error));
  };

  const handleEditClick = (id, currentTask) => {
    setEditingTodoId(id);
    setTask(currentTask);
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setTask("");
  };
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/delete/${id}`, { task: task })
      .then((result) => console.log(result.data))
      .catch((error) => console.log(error));
  };
  return (
    <div
      style={{
        textAlign: "center",
        height: "500px",
      }}
    >
      <h1 style={{ color: "#333", fontFamily: "monospace", fontSize: "50px" }}>
        Time Slice
      </h1>
      <Create />
      {todos.length === 0 ? (
        <h2>No Record</h2>
      ) : (
        todos.map((todo) => (
          <div
            key={todo._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "300px",
              margin: "10px auto",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#fff",
            }}
          >
            {editingTodoId === todo._id ? (
              <>
                <input
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  style={{
                    flex: "1",
                    marginRight: "5px",
                    padding: "5px",
                    borderRadius: "3px",
                    border: "1px solid #ccc",
                  }}
                />

                <FaSave
                  style={{
                    backgroundColor: "#007bff",
                    color: "#fff",
                    marginRight: "5px",
                    padding: "5px 10px",
                    borderRadius: "3px",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => handleUpdate(todo._id)}
                />
                <GiCancel
                  style={{
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    padding: "5px 10px",
                    borderRadius: "3px",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={handleCancelEdit}
                />
              </>
            ) : (
              <>
                <FaCheckSquare
                  style={{
                    backgroundColor: "#28a745",
                    color: "#fff",
                    marginRight: "5px",
                    padding: "5px 10px",
                    borderRadius: "3px",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => handleCheck(todo._id, todo.done)}
                />
                <p
                  style={{
                    flex: "1",
                    margin: "0",
                    fontSize: "16px",
                    textDecoration: todo.done ? "line-through" : "",
                    fontFamily: "monospace",
                  }}
                >
                  {todo.task}
                </p>

                <FaEdit
                  style={{
                    backgroundColor: "#007bff",
                    color: "#fff",
                    marginRight: "5px",
                    padding: "5px 10px",
                    borderRadius: "3px",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => handleEditClick(todo._id, todo.task)}
                />
                <MdDelete
                  style={{
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    padding: "5px 10px",
                    borderRadius: "3px",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(todo._id)}
                />
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
