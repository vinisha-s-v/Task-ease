import React, { useEffect, useState } from "react";
import axios from "axios";

const CompletedTask = () => {
  const token = localStorage.getItem("authToken");
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  const fetchCompletedTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/users/tasks/completed",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCompletedTasks(response.data.reverse());
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    }
  };

  return (
    <div className="relative h-screen w-full bg-green-50">
      <div className="w-full py-4">
        <h1 className="text-2xl font-bold flex justify-center text-green-800">
          Completed Tasks
        </h1>
      </div>
      <div className="relative w-full flex flex-col px-4">
        {completedTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-100 p-4 rounded-md shadow-md"
              >
                <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
                <p className="text-gray-600 mb-1">{task.description}</p>
                <p className="text-green-600 mb-1">
                  <strong>Scheduled:</strong>{" "}
                  {new Date(task.scheduleTime).toLocaleString()}
                </p>
                <p className="text-red-600 mb-1">
                  <strong>Deadline:</strong>{" "}
                  {new Date(task.deadLine).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="pt-8 text-2xl font-thin text-center">
            No completed tasks yet!
          </p>
        )}
      </div>
    </div>
  );
};

export default CompletedTask;
