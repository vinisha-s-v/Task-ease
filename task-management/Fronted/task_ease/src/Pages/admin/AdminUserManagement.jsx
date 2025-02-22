import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateTaskForm from "../../Components/CreateTaskForm";
import { toast } from "react-toastify";
import ConfirmationModal from "../../modal/confirmatonModal";







const AdminDashBord = () => {



  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const[showToast,setShowToast]=useState(false)
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);


  //fetch user from backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRemoveClick = (userId) => {
    setSelectedUserId(userId); // Set the selected user ID
    setShowModal(true); // Show the confirmation modal
  };

  const handleConfirmDelete = () => {
    if (selectedUserId) {
      deleteUser (selectedUserId); // Call deleteUser  with the selected user ID
    }
  };


  const handleClick = () =>{
    toast.success("Action was successful!", {
      position: "top-right",
    });
  }




  const token = localStorage.getItem("authToken");
  // console.log(token, "vijay");

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

  //sort users alphabetical by name

  const sortedUsers =[...users].sort((a,b)=>
    a.firstName.localeCompare(b.firstName)
  )



  //method for delete user

  const deleteUser = async (userId) => {
    const token = localStorage.getItem("authToken");
    try {
      const deleteUser = users.find((user) => user.id === userId);
    const response =  await axios.delete(`http://localhost:8080/api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Delete response:", response.data);
      // setUsers(users.filter((user) => user.id !== userId));
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

      console.log("User deleted Successfully");
      
      
toast.info(
  <div>
    user deleted Successfully!{""}
    <button onClick={()=>restoreUser(deleteUser)}
       className="text-blue-500 underline"
       >
        undo

    </button>
  </div>,
  {autoClose:5000}
)

      setTimeout(()=>setShowToast(false),3000);
      setShowModal(false);
      setSelectedUserId(null);

    } catch (error) {
      console.error("Error deleting user:", error);
      // toast.error("Failed to delete user!");
     // toast.loading("loading");
    }
     
    
    
    
  };

  const restoreUser =async(user)=>{
    const token =localStorage.getItem("authToken");
    try{
      const response = await axios.put(`http://localhost:8080/api/admin/users/restore/${user.id}`,
        user,{
          headers:{
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json",
          },
        }
        
      )
      setUsers((prevUsers) => [...prevUsers, response.data]);
      toast.success("User restored successfully!");
    }
    catch(error){
      console.error("Error restoring user:",error);
      toast.error("Failed to restore user!");
    }
  }




  const handleAddUser = () => {
    navigate("/admin/add-user");
  };
  const handleUpdate = (user) => {
    console.log(user);

    navigate("/admin/update-user", { state: { user } });
  };

  const userSerchManagementAdmin = async (token, keyword) => {
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
        console.log("API Response :" ,response.data)
        setUsers(response.data || []); // Update users with search results or empty array
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  return (
    <div className="bg-black min-h-screen p-4 sm:p-6 md:p-8 w-full">
      <div className="flex justify-end m-5">
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none h-10 w-full sm:w-1/2 md:w-[24rem] border border-gray-300 rounded-sm p-2"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-white text-2xl sm:text-3xl font-bold" onClick={handleClick}>USERS</h1>
        <button
          type="button"
          onClick={handleAddUser}
          className="mt-3 sm:mt-0 text-white bg-gray-700 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Add User
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto max-h-[500px]">        {sortedUsers.map(
          (user) =>
            user.role !== "ADMIN" && (
              <div
                key={user.id}
                 className="bg-white p-4 rounded-lg shadow-lg border border-gold text-black"
              >
                <h2  className="text-lg sm:text-xl font-light mb-2 text-black">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="mb-1">Email: {user.email}</p>
              
                <p className="mb-1">Role: {user.role}</p>

                <div className=" flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => handleUpdate(user)}
                    className="
                    text-gray-900 bg-white border border-gray-300 
                    focus:outline-none hover:bg-gray-100 focus:ring-4 
                    focus:ring-gray-100 font-medium rounded-lg 
                    text-sm px-4 py-2 me-2 mb-2 
                    sm:text-xs sm:px-2 sm:py-1 sm:me-1.5 sm:mb-1.5 
                    md:text-sm md:px-3 md:py-1.5 md:me-2 md:mb-2 
                    lg:text-base lg:px-4 lg:py-2 lg:me-3 lg:mb-2.5 
                    dark:bg-gray-800 dark:text-white dark:border-gray-600 
                    dark:hover:bg-gray-700 dark:hover:border-gold-600 
                    dark:focus:ring-gold-700
                  "
                  >
                    UPDATE
                  </button>
                  <button
                    type="button"
                    onClick={() =>handleRemoveClick(user.id)}
                    className="
    text-gray-900 bg-white border border-gray-300 
    focus:outline-none hover:bg-gray-100 focus:ring-4 
    focus:ring-gray-100 font-medium rounded-lg 
    text-sm px-4 py-2 me-2 mb-2 
    sm:text-xs sm:px-2 sm:py-1 sm:me-1.5 sm:mb-1.5 
    md:text-sm md:px-3 md:py-1.5 md:me-2 md:mb-2 
    lg:text-base lg:px-4 lg:py-2 lg:me-3 lg:mb-2.5 
    dark:bg-gray-800 dark:text-white dark:border-gray-600 
    dark:hover:bg-gray-700 dark:hover:border-gold-600 
    dark:focus:ring-gold-700
  "
                  
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            )
        )}
      </div>


      {showToast && <Toast/>}
         {/* Confirmation Modal */}
         <ConfirmationModal
         show={showModal}
        onConfirm={handleConfirmDelete} // Call the confirm delete method
        onCancel={() => setShowModal(false)} // Close the modal
       />
      
    </div>


  );
 
  
};

export default AdminDashBord;
