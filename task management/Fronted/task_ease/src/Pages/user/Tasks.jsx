import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import CreateTaskForm from "../../Components/CreateTaskForm";
import UpdateTaskForm from "../../Components/UpdateTaskForm"; // Ensure you import UpdateTaskForm
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns"; // date-fns for formatting dates

const Tasks = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [isOpenForm, setOpenForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const openForm = () => {
    setOpenForm(true);
  };

  const closeForm = () => {
    setOpenForm(false);
    setSelectedTask(null); // Reset selected task when closing
  };
  
  useEffect(() => {
    fetchTasks();
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdate = (task) => {
    if (task) {
      setSelectedTask(task);
    }
  };

  return (
    <div className="relative h-screen w-full bg-blue-50">
      <button
        onClick={openForm}
        className="fixed z-10 bottom-10 right-10 bg-blue-400 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-blue-600"
      >
        <FaPlus size={24} />
      </button>

      <div className="w-full py-4 bg-blue-200">
        <h1 className="text-2xl font-bold flex justify-center text-blue-800">
          Your Tasks
        </h1>
      </div>

      <div className="relative w-full flex flex-col px-4">
        {tasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {tasks.map((task) => (
              <div key={task.id} className="bg-gray-100 p-4 rounded-md shadow-md hover:transition-transform duration-300 ease-in-out transform hover:scale-95">
                <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
                <p className="text-gray-600 mb-1">{task.description}</p>
                <p className="text-green-600 mb-1">
                  Scheduled: {format(new Date(task.scheduleTime), "yyyy-MM-dd HH:mm")}
                </p>
                <p className="text-red-600 mb-1">
                  Deadline: {format(new Date(task.deadLine), "yyyy-MM-dd HH:mm")}
                </p>
                <div className="flex space-x-2 justify-end mt-2">
                  <button
                    onClick={() => handleUpdate(task)}
                    className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="pt-8 text-2xl font-thin text-center">
            Please add your First Task!
          </p>
        )}
      </div>

      {isOpenForm && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center z-50 my-20">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative flex items-center justify-center">
            <CreateTaskForm onClose={closeForm} />
            <button onClick={closeForm} className="absolute top-1 right text-2xl text-gray-500 hover:text-gray-700">
              X
            </button>
          </div>
        </div>
      )}

      {selectedTask && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center z-50 my-20 ">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative flex items-center justify-center">
            <UpdateTaskForm task={selectedTask} onClose={closeForm} />
            <button onClick={closeForm} className="absolute top-1 right text-2xl text-gray-500 hover:text-gray-700">
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
