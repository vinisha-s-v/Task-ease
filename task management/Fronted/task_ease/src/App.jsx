import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* admin */}
          <Route path="/" element={<AdminLoginPage />} />
          <Route path="/admin" element={<Layout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUserManagement />} />
            <Route path="add-user" element={<AddUserForm />} />
            <Route path="update-user" element={<UpdateUserForm />} />
          </Route>

          {/* admin end */}

          {/* user start */}

          <Route path="/login" element={<UserLoginPage />}></Route>

          <Route path="/home" element={<Home />}>
            <Route path="user" element={<TaskLayout/>}>
            <Route index element={<Tasks />} />
                
            </Route>
          </Route>


          {/* <Route path="/user" element={<TaskLayout />}>
              
              <Route path="update-task" element={<UpdateTaskForm />}></Route>
            </Route> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
