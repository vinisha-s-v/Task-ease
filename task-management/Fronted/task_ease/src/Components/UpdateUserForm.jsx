import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateUserForm = () => {
  const location = useLocation();
  const user = location.state?.user;

  // console.log(user, "vijay kuttan");

  const [updateUser, setUpdateUser] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    role: user?.role || "",
  });

  const [password, setPassword] = useState("");



 




  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUpdateUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      ...updateUser,
      ...(password && { password }),
    };

    console.log("User data to update:", userData);

    setPassword("");
  };
  const navigate=useNavigate();
  const handleSave = async() =>{
    const saveUpdatedUser = {...user,...updateUser};
    const token=localStorage.getItem('authToken');
    const id=user ?.id
    try{
      const response= await axios.put(`http://localhost:8080/api/admin/users/${user.id}`,saveUpdatedUser,{
      headers : {
        'Authorization': `Bearer ${token}`,
        'Content-Type' :  'application/json',
        },
      })
      console.log(saveUpdatedUser);
      console.log("user updated successfully:",response.data)
      
    }catch(error){
      console.log(error);
      
    }
    navigate("/admin/users");
    

  } 
  return (
    <div className="bg-black min-h-screen p-6">
      <h1 className="text-white text-3xl font-bold mb-6">Update User</h1>
      <form className="bg-white p-6 rounded-lg" onSubmit={handleSubmit}>
        <div>
          <label>Firstname</label>
          <input
            type="text"
            onChange={handleInputChange}
            value={updateUser.firstName}
            className="border-gray-300 block w-full p-2 mb-4"
            name="firstName" 
          />

          <label>Lastname</label>
          <input
            type="text"
            onChange={handleInputChange}
            value={updateUser.lastName}
            name="lastName" 
            className="border-gray-300 block w-full p-2 mb-4"
          />

          <label>Email</label>
          <input
            type="email"
            onChange={handleInputChange}
            value={updateUser.email}
            name="email"
            className="border-gray-300 block w-full p-2 mb-4"
          />

          <label>Password (Leave blank to keep unchanged)</label>
          <input
            type="password"
            onChange={handlePasswordChange}
            value={password}
            name="password"
            className="border-gray-300 block w-full p-2 mb-4"
          />

          <label>Role</label>
          <input
            type="text"
            onChange={handleInputChange}
            value={updateUser.role}
            name="role"
            className="border-gray-300 block w-full p-2 mb-4"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>
          Update User
        </button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
