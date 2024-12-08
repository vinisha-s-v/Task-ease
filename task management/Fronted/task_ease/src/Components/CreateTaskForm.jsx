import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateTaskForm = ({ token, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
   
    e.preventDefault();
    const token=localStorage.getItem('authToken');
    console.log('Token:', token); 
   
    try {
      
      const response = await axios.post(
        "http://localhost:8080/api/users/tasks/create",
        {
          title,
          description,
          scheduleTime,
          deadLine

        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response.data,"data");
      // console.log(scheduleTime);
      // console.log(deadline);

      const { createdAt } = response.data; // Extract createdAt from the response
      console.log("Task Created At:", createdAt);
      onClose();
      navigate('/home/user');
      // closeForm();
    
    } catch (err) {
      console.log(err);
    }
    // console.log(tasks);
 
 
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10 justify-center">
      <h1 className="text-xl font bold text-center mb-6">Add your Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input

            type="text"
            placeholder="Enter title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>

          <textarea
           className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight "
          onChange={(e) => setDescription(e.target.value)}
          value={description} />
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
          />
        </div>
        <button
          type="submit"
         
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateTaskForm;
