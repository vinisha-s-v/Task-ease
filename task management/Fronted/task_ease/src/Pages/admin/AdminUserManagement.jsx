import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateTaskForm from "../../Components/CreateTaskForm";

const AdminDashBord = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  //fetch user from backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const token = localStorage.getItem("authToken");
  console.log(token, "vijay");

  //method fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setUsers(response.data);
      console.log(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  //method for delete user

  const deleteUser = async (userId) => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(`http://localhost:8080/api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setUsers(users.filter((user) => user.id !== userId));
      console.log("User deleted Successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAddUser = () => {
    navigate("/add-user");
  };
  const handleUpdate = (user) => {
    console.log(user);

    navigate("/update-user", { state: { user } });
  };

  const userSerchManagemwntAdmin = async (token, keyword) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/users/search?keyword=${keyword}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleSearchChange = async (e) => {
    // const token = localStorage.getItem("authToken");
    // console.log(token)
    // setSearchTerm(e.target.value);
    // const role = localStorage.getItem("authRole");
    // console.log("role",role)
    const keyword = e.target.value;
    setSearchTerm(keyword);

    if (keyword.trim() === "") {
      fetchUsers();
    } else {
      //   if(Auth.token==="ADMIN"){
      try {
        // Call search endpoint with the keyword
        const response = await axios.get(
          `http://localhost:8080/api/admin/users/search?keyword=${keyword}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setUsers(response.data || []); // Update users with search results or empty array
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  return (
    <div className="bg-black min-h-screen p-6 w-full">
      <div className="flex justify-end m-5">
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm p-2"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex justify-between">
        <h1 className="text-white text-3xl font-bold mb-6">USERS</h1>
        <button
          type="button"
          onClick={handleAddUser}
          className="text-gray-900 hover:text-white border border-gray-800
         hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2
         
        dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        >
          Add User
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {users.map(
          (user) =>
            user.role !== "ADMIN" && (
              <div
                key={user.id}
                className="bg-white p-4 rounded-lg shadow-lg border border-gold text-balck"
              >
                <h2 className="text-xl font-light mb-2 text-black">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="mb-1">Email: {user.email}</p>
                <p className="mb-1">Role: {user.role}</p>

                <div className=" flex justify-between">
                  <button
                    type="button"
                    onClick={() => handleUpdate(user)}
                    className="text-gray-900 bg-white border
                   border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4
                    focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                     dark:bg-gray-800 dark:text-white dark:border-gray-600
                      dark:hover:bg-gray-700 dark:hover:border-gold-600 dark:focus:ring-gold-700"
                  >
                    UPDATE
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteUser(user.id)}
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none
                  hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                   dark:bg-gray-800 dark:text-white dark:border-gray-600
                    dark:hover:bg-gray-700 dark:hover:border-gold-600 dark:focus:ring-gold-700"
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default AdminDashBord;
