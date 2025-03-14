import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import CreateTaskForm from "../../Components/CreateTaskForm";
import UpdateTaskForm from "../../Components/UpdateTaskForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../../modal/confirmatonModal";

const Tasks = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [isOpenForm, setOpenForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [taskUpdated, setTaskUpdated] = useState(false);

  const openForm = () => {
    setOpenForm(true);
  };

  const closeForm = () => {
    setOpenForm(false);
    setSelectedTask(null);
  };

  useEffect(() => {
    if (token) {
      fetchTasks();
    } else {
      navigate("/login");
    }
  }, [token, navigate, tasks, taskUpdated]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://task-ease-oh5d.onrender.com/api/users/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTasks(response.data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveClick = (taskId) => {
    setTaskToDelete(taskId);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      deleteTask();
    }
  };

  const deleteTask = async () => {
    if (!taskToDelete) return;

    try {
      await axios.delete(`https://task-ease-oh5d.onrender.com/api/users/tasks/${taskToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setTasks(tasks.filter((task) => task.id !== taskToDelete));
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task.");
    }
    setShowModal(false);
  };

  const handleUpdate = (task) => {
    if (task) {
      setSelectedTask(task);
      setOpenForm(true);
    }
  };

  const updateTaskStatus = async (taskId) => {
    try {
      await axios.put(
        `https://task-ease-oh5d.onrender.com/api/users/tasks/${taskId}/mark-completed`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTaskUpdated(!taskUpdated);
      toast.success("Task marked as completed");
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status");
    }
  };

  return (
    <div className="relative h-screen w-full bg-blue-50 flex flex-col">
      <ToastContainer />
      <button
        onClick={openForm}
        aria-label="Add Task"
        className="fixed z-30 bottom-16 right-10 bg-blue-400 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-600"
      >
        <FaPlus size={20} />
      </button>

      <div className="w-full py-4">
        <h1 className="text-2xl font-bold flex justify-center text-blue-800">
          Your Tasks
        </h1>

        <button
          onClick={() => navigate("/home")}
          className="absolute top-4 left-4 p-2 bg-blue-600 text-white rounded-full shadow-md"
        >
          <AiOutlineArrowLeft size={24} />
        </button>
      </div>

      <div className="relative w-full flex flex-col px-4">
        {tasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-md shadow-md hover:transition-transform duration-300 ease-in-out transform hover:scale-95 ${
                  task.completed
                    ? "bg-gray-200 opacity-50 cursor-not-allowed"
                    : "bg-blue-200"
                }`}
              >
                <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
                <p className="text-gray-600 mb-1">{task.description}</p>
                <p className="text-green-600 mb-1">
                  <strong>Scheduled:</strong>{" "}
                  {new Date(task.createdAt).toLocaleString()}
                </p>
                <p className="text-red-600 mb-1">
                  <strong>Deadline:</strong>{" "}
                  {format(new Date(task.deadLine), "yyyy-MM-dd HH:mm")}
                </p>
                <div className="flex space-x-1 justify-end mt-2">
                  <button
                    onClick={() => handleUpdate(task)}
                    className="bg-blue-400 text-white px-2 py-1 rounded-md hover:bg-blue-500 text-sm"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleRemoveClick(task.id)}
                    className="bg-blue-700 text-white px-2 py-1 rounded-md hover:bg-blue-800 text-sm"
                  >
                    Delete
                  </button>
                  {task.completed === false && (
                    <button
                      onClick={() => updateTaskStatus(task.id)}
                      className="bg-blue-950 text-white px-2 py-1 rounded-md hover:bg-blue-600 text-sm"
                    >
                      Complete
                    </button>
                  )}
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
            <button
              onClick={closeForm}
              className="absolute top-1 right text-2xl text-gray-500 hover:text-gray-700"
            >
              X
            </button>
          </div>
        </div>
      )}

      {selectedTask && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center z-50 my-20 ">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative flex items-center justify-center">
            <UpdateTaskForm task={selectedTask} onClose={() => setSelectedTask(null)} />
            <button
              onClick={closeForm}
              className="absolute top-1 right text-2xl text-gray-500 hover:text-gray-700"
            >
              X
            </button>
          </div>
        </div>
      )}

      <ConfirmationModal
        show={showModal}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default Tasks;