import React from 'react'
import FooterHome from '../../Components/FooterHome'
import NavigationBar from '../../Components/NavigationBar'

const About = () => {
  return (
  
    <div>

   <NavigationBar/>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
         
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          About Taskease
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          <strong>Taskease</strong> is your one-stop solution for task management. 
          Designed to simplify your workflow and enhance productivity, 
          Taskease offers features like creating, updating, and scheduling tasks with ease. 
          Whether you are a professional managing projects or an individual organizing daily 
          routines, Taskease adapts to your needs seamlessly.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          At Taskease, we aim to provide an intuitive platform for users to manage their 
          tasks efficiently. Our goal is to empower individuals and teams to focus on what 
          truly matters, ensuring no task is left behind.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
        <ul className="list-disc pl-6 text-gray-600 text-lg leading-relaxed mb-6">
          <li>Easy-to-use interface for managing tasks.</li>
          <li>Powerful features like scheduling and deadlines.</li>
     
          <li>Customizable for individual and team workflows.</li>
        </ul>
        <div className="flex justify-center">
          <a
            href="/"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300"
          >
            Get Started
          </a>
        </div>
      </div>

      <FooterHome/>
    </div>
    </div>
  )
}

export default About
