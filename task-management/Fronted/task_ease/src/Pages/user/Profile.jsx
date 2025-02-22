import React, { useEffect, useState } from 'react';
import { FaUser, FaEdit, FaEnvelope } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { IoIosHelpCircle } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const [menuActive, setMenuActive] = useState(false);
    const [userName,setUserName]=useState('')

    const navigate =useNavigate();


    // useEffect(()=>{
    //   const storedUserName = localStorage.getItem('userName')// Assuming 'userName' is stored in localStorage
    //   if(storedUserName){
    //     storedUserName(storedUserName);
    //   }
    // },[])

  const menuToggle = () => {
    setMenuActive(!menuActive);
  };


  const handleLogout =()=>{

    localStorage.clear(); // Clear user datta from localStroge

    //localStorage.removeItem('token');
     
    setMenuActive(false);

    navigate('/login');
  }
  const handleProfile =()=>{
    navigate("/profile-user")
  }

  return (
    
      <div className="relative flex justify-end items-end">
        {/* Profile */}
        <div
          className="w-16 h-16 rounded-full overflow-hidden cursor-pointer flex justify-center items-center"
          onClick={menuToggle}
        >
         <FaUser size={24}/>
        </div>

        {/* Dropdown Menu */}
        <div
          className={`absolute z-30 top-20 right-0 bg-white shadow-lg rounded-lg transition-all duration-300 ${
            menuActive ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {/* <div className="text-center p-4 border-b">
            <h3 className="font-semibold text-gray-600">{userName || 'Guest'}</h3>
            <span className="text-sm text-gray-400"></span>
          </div> */}
          <ul className="p-4">
            {/* <MenuItem icon={<FaUser />  } label="My Profile"onClick={handleProfile} />
            <MenuItem icon={<FaEdit />} label="Edit Profile"   /> */}
            {/* <MenuItem icon={<FaEnvelope />} label="Inbox" /> */}
            {/* <MenuItem icon={<IoIosSettings />} label="Settings" /> */}
            {/* <MenuItem icon={<IoIosHelpCircle />} label="Help" /> */}
            <MenuItem icon={<MdLogout />} label="Logout"  onClick={handleLogout}/>
          </ul>
        </div>
      </div>
   
  );
}

const MenuItem = ({ icon, label,onClick }) => (
    <li className="flex items-center gap-3 p-2 border-t hover:text-pink-500 cursor-pointer" onClick={onClick}>
      <span className="w-5 opacity-70 hover:opacity-100" >{icon} </span>
      <span className="font-medium">{label}</span>
    </li>
  );

export default Profile;
