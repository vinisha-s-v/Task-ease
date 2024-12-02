import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AdminLoginPage from "./Pages/admin/AdminLoginPage";

import { AuthProvider } from "./Providers/AuthProvider";
import UpdateUserForm from "./Components/UpdateUserForm";
import AddUserForm from "./Components/AddUserForm";
import Home from "./Pages/user/Home";
import Tasks from "./Pages/user/Tasks";
import UserLoginPage from "./Pages/user/UserLoginPage";
import UpdateTaskForm from "./Components/UpdateTaskForm";
import Layout from "./Components/admin/Shared/Layout";

import Dashboard from "./Components/Dashboard";
import TaskLayout from "./Components/user/shared/TaskLayout";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import AdminUserManagement from "./Pages/admin/AdminUserManagement";
import About from "./Pages/user/About";
import Profile from "./Pages/user/Profile";
import Register from "./Pages/user/Register";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
    <ToastContainer />

      <Router>
        <Routes>
          {/* admin */}
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<Layout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUserManagement />} />
            <Route path="add-user" element={<AddUserForm />} />
            <Route path="update-user" element={<UpdateUserForm />} />
          </Route>

          {/* admin end */}

          {/* user start */}
           {/* Redirect the root path "/" to the login page */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<UserLoginPage />}></Route>

          <Route path="/home" element={<Home />}>
            <Route path="user" element={<TaskLayout/>}>
           
            <Route index element={<Tasks />} />
            {/* <Route path ="task" element={<Tasks/>}/> */}
                
            </Route>
          </Route>

          <Route path="/about" element={<About/>}/>


          {/* <Route path="/user" element={<TaskLayout />}>
              
              <Route path="update-task" element={<UpdateTaskForm />}></Route>
            </Route> */}


<Route path="/register" element={<Register/>}/> 


        </Routes>  
        
      </Router>
    </AuthProvider>
  );
}

export default App;
