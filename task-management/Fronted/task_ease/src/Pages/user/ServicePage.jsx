import React from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../Components/NavigationBar";

const ServicePage = () => {

    const navigate = useNavigate();
    const handleGetStarted =()=>{
        navigate("/home");
    }
  return (

    <div >
      <div className="w-full">
        <NavigationBar />
      </div>
      <div className="bg-blue-100 min-h-screen p-6">
      
      <div className="container mx-auto ">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          Task Management System Services
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Create Tasks
            </h2>
            <p className="text-gray-600">
              Easily create tasks by adding a title, description, deadline, and
              schedule time. The system allows for organizing tasks with all
              necessary details.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Manage Deadlines
            </h2>
            <p className="text-gray-600">
              Set deadlines and scheduled times for your tasks and never miss a
              priority. Deadlines are highlighted for better task tracking.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Edit & Update Tasks
            </h2>
            <p className="text-gray-600">
              Update task details like title, description, or deadlines at any
              time to adapt to changing requirements.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Search Tasks
            </h2>
            <p className="text-gray-600">
              Quickly find tasks using the search functionality. Filter by
              title, status, or deadline for efficient task management.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              User-Friendly Dashboard
            </h2>
            <p className="text-gray-600">
              Access a comprehensive dashboard that displays your tasks with
              deadlines, schedules, and progress tracking in an organized view.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Admin Controls
            </h2>
            <p className="text-gray-600">
              Admin users can view, create, edit, and delete tasks for better
              team coordination. Manage user roles and task assignments easily.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Why Choose Our Task Management System?
          </h2>
          <p className="text-gray-600 mb-6">
            Our system provides an intuitive interface, real-time updates, and
            advanced features for managing tasks efficiently. Whether you're
            working alone or in a team, our system helps you stay organized and
            productive.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
           onClick={handleGetStarted}>
           
            Get Started
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ServicePage;
