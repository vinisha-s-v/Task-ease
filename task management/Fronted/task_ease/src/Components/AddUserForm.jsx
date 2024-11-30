import axios from "axios";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const AddUserForm = () => {
  const [adduser, setAddUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
 const navigate =useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/admin/users",
        adduser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
        
      );
      console.log("User Added Sucessfully:", response.data);
    } catch (error) {
      console.log(error);
    }
    navigate("/admin/users");
  };
  return (
    <div className="bg-black min-h-screen p-6">
      <h1 className="text-white text-3xl font-bold mb-6 ">Register user</h1>
      <form className="bg-white p-6 rounded-lg" onSubmit={handleSubmit}>
        <div>
          <label>Firstname</label>
          <input
            type="text"
            onChange={handleChange}
            className="w-full mb-6 border-sky-200 p-2 "
            placeholder="Enter first name"
            name="firstName"
            value={adduser.firstName}
          ></input>
          <label>Lastname</label>
          <input
            type="text"
            onChange={handleChange}
            className="w-full mb-6 border-sky-200 p-2"
            placeholder="Enter last name"
            name="lastName"
            value={adduser.lastName}
          ></input>
          <label>Email</label>
          <input
            type="email"
            onChange={handleChange}
            className="w-full mb-6 border-sky-200 p-2"
            placeholder="Enter Email"
            name="email"
            value={adduser.email}
          ></input>
          <label>Password</label>
          <input
            type="password"
            onChange={handleChange}
            className="w-full mb-6 border-sky-200 p-2"
            placeholder="Enter Password"
            name="password"
            value={adduser.password}
          ></input>
          <label>Role</label>
          <input
            type="text"
            onChange={handleChange}
            className="w-full mb-6 border-sky-200 p-2"
            placeholder="Enter Role"
            name="role"
            value={adduser.role}
          ></input>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
