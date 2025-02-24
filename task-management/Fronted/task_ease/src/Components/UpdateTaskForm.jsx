import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdateTaskForm = ({ task, onClose }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const[scheduleTime,setScheduleTime] = useState(task.scheduleTime);
  const[deadLine,setDeadLine]= useState(task.deadLine);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
   // setScheduleTime(task.scheduleTime);
    setDeadLine(task.deadLine);
  }, [task]);
  

  const navigate=useNavigate()
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.put(
        `https://task-ease-oh5d.onrender.com/api/users/tasks/${task.id}`,
        { title, description,scheduleTime,deadLine },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
        
      );

      console.log("Task Updated:", response.data);
      onClose(); // Close modal after successful update
    } catch (error) {
      console.error("Error updating task:", error);
    }

 
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h3 className='text-xl font-bold text-center mb-6'>Update Task</h3>
      <form onSubmit={handleUpdateSubmit}>
        <div className="mb-4">  
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type='text'
            value={title}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Task Title'
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            value={description}
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight"
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Task Description'
          />
        </div>

        {/* <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Scheduled Time
          </label>
          <input
            type="datetime-local"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
          />
        </div> */}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Deadline</label>
          <input
            type="datetime-local"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={deadLine}
            onChange={(e) => setDeadLine(e.target.value)}
            min={new Date().toISOString().slice(0,16)}
          />

        </div>


        <button
          type='submit'
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default UpdateTaskForm;
