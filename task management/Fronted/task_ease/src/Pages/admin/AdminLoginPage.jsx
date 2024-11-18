import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLoginPage() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();
  // const [auth,setAuth]=useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(""); //Resterror msg on each submit

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/authenticate",
        {
          email,
          password,
        }
      );

      // setAuth({
      //   token:response.data.token,
      //   firstName:response.data.firstName,
      //   email:response.data.email,
      //   role:response.data.role
      // })

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("authToken", response.data.token); //save the authtoken in localstorage

        navigate("/admin/dashboard");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center bg-greay-100 justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-black-800">
            Admin Login page
          </h2>

          <p className="text-red-500 text-center mb-4">{error}</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* email div */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* password div */}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                Placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-sm hover:bg-indigo-500 foucs:ring-indigo-500"
            >
              Login
            </button>
          </form>

          <div className="nt-4 text-center">
            <a href="#" className="text-indigo-600 hover:tex-indigo-500">
              Forgot your password
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLoginPage;
