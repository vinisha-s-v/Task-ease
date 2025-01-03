import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import CreateTaskForm from "../../Components/CreateTaskForm";
import UpdateTaskForm from "../../Components/UpdateTaskForm"; // Ensure you import UpdateTaskForm
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns"; // date-fns for formatting dates
import { toast } from "react-toastify";

import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const Tasks = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [isOpenForm, setOpenForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const [deletedTask, setDeletedTask] = useState(null);

 const [taskUpdated,setTaskUpdated]=useState(false);

  const openForm = () => {
    setOpenForm(true);
  };

  const closeForm = () => {
    setOpenForm(false);
    setSelectedTask(null); // Reset selected task when closing
  };

  useEffect(() => {
    fetchTasks();
  }, [taskUpdated]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/users/tasks",
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

  const deleteTask = async (taskId) => {
    console.log(taskId);
    const taskToDelete = tasks.find((task) => task.id === taskId);
    if (!taskToDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/users/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setTasks(tasks.filter((task) => task.id !== taskId));
      setDeletedTask(taskToDelete);

      toast.info(
        <div>
          Task deleted successfully!{" "}
          <button
            onClick={() => restoreTask(taskToDelete)}
            className="text-blue-500 underline"
          >
            Undo
          </button>
        </div>,
        { autoClose: 5000 }
      );
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task.");
    }
  };
  const restoreTask = async (task) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/tasks/create",
        {
          title: task.title,
          description: task.description,
          scheduleTime: task.scheduleTime,
          deadLine: task.deadLine,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTasks((prevTasks) => [response.data, ...prevTasks]);
      toast.success("Task restored successfully!");
    } catch (error) {
      console.error("Error restoring task:", error);
      toast.error("Failed to restore task.");
    }
  };

  const handleUpdate = (task) => {
    if (task) {
      setSelectedTask(task);
    }
  };

  const updateTaskStatus =async(taskId)=>{
    console.log("Task ID:", taskId); 
    try{
      const token = localStorage.getItem('authToken'); 
      await axios.put(`http://localhost:8080/api/users/complete/${taskId}`,
         {},
        {
          headers:{
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
          },
        }
      );
    
      // setTasks(response.data.reverse());
      console.log("Response:", response);
       setTaskUpdated(!taskUpdated);

      toast.success("Task marked as completed")

    }
    catch(error){
      console.error("Error updating task status:",error);
      toast.error("Failed to update task status")
    }

  }



  return (
    <div className="relative h-screen w-full bg-blue-50">
      <ToastContainer />
      <button
        onClick={openForm}
        className="fixed z-30 bottom-16 right-10 bg-blue-400 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-blue-600"
      >
        <FaPlus size={24} />
      </button>

      <div className="w-full py-4">
        <h1 className="text-2xl font-bold flex justify-center text-blue-800">
          Your Tasks
        </h1>
      </div>

      <div className="relative w-full flex flex-col px-4">
        {tasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-100 p-4 rounded-md shadow-md hover:transition-transform duration-300 ease-in-out transform hover:scale-95"
              >
                <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
                <p className="text-gray-600 mb-1">{task.description}</p>
                <p className="text-green-600 mb-1">
                  {/* Scheduled: {format(new Date(task.scheduleTime), "yyyy-MM-dd HH:mm")} */}
                  <strong>Scheduled:</strong>{" "}
                  {new Date(task.createdAt).toLocaleString()}
                </p>
                <p className="text-red-600 mb-1">
                  <strong>Deadline:</strong>{" "}
                  {format(new Date(task.deadLine), "yyyy-MM-dd HH:mm")}
                </p>
                <div className="flex space-x-2 justify-end mt-2">
                  <button
                    onClick={() => handleUpdate(task)}
                    className="bg-blue-400 text-white px-2 py-1 rounded-md hover:bg-blue-500"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-blue-700 text-white px-2 py-1 rounded-md hover:bg-blue-800"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => updateTaskStatus(task.id)}
                    className="bg-blue-950 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                  >
                    Mark as Completed
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
            <UpdateTaskForm task={selectedTask} onClose={closeForm} />
            <button
              onClick={closeForm}
              className="absolute top-1 right text-2xl text-gray-500 hover:text-gray-700"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
