import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Navigate,Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../Providers/AuthProvider';
 import bglogin from '../../assets/user/signup.avif'
import { AiOutlineArrowLeft } from "react-icons/ai";
const UserLoginPage = () => {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('')
    const[error,setError]=useState('')
    const navigate =useNavigate();
    const { setAuth } = useContext(AuthContext)


        const handleSubmit = async(e)=>{
          e.preventDefault();
          setError("");
        try{
            console.log(email,password);
            
            const response=await axios.post("https://task-ease-oh5d.onrender.com/auth/authenticate",{
                email,password
            })


            if(response.status===200 && response.data.token){
              setAuth({
                token:response.data.token,
                email: response.data.email,
                 role: response.data.role

            })

            console.log(response.data.token,"vijay shushu");
            
              
                localStorage.setItem("authToken",response.data.token)
                navigate('/home');
              
            }
            else{
                setError("Invalid username or password")
            }
            
        }
        catch(error){
            // setError("Invalid username or password")
            console.log(error);
             
        }     
    }
    // const handleGoBack =()=>{
    //   navigate("/main-home")
    // }
  return (
    <>
      <div className='min-h-screen flex items-center bg-gray-100 justify-center'
       style={{backgroundImage:`url(${bglogin})`,
       backgroundSize: 'cover',
        backgroundPosition: 'center',}}
      >
        <div className='bg-white p-8 opacity-1 rounded-lg w-full max-w-md'>
            <h2 className='text-2xl font-bold text-center text-black-800'>Login</h2>
            <p className='text-red-500 text-center mb-4'>{error}</p>
            <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>Email</label>
                <input  className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-300 focus:border-blue-300'
                placeholder='Enter your email' required
                type='email'
                value={email}
                name='email'
                onChange={(e)=>setEmail(e.target.value)}/>
                
              </div>

              <div>
              <label className='block text-sm font-medium text-gray-700'>Password</label>
              <input onChange={(e)=>setPassword(e.target.value)}
              value={password}
              placeholder='Enter your Password'
              name='password'
              type='password'
              className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-300 focus:border-blue-300'/>

<button
// onClick={ Navigate("/home")}
              type='submit'
              className='w-full mt-6 py-2 px-4 bg-blue-600 text-white font-semibold rounded-sm hover:bg-blue-500 focus:ring-blue-500'
            >
              Login
            </button>

              </div>
            </form>
            <div className='mt-4 text-center'>
            
            <a href='#' className='text-indigo-600 hover:text-indigo-500' onClick={() => navigate('/reset-password')}>Forgot your password?</a>
          </div>

          <div className="mt-4 text-center">
            <p className="text-gray-700">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </p>
          </div>

          <button
        onClick={() => navigate("/main-home")} 
        className="absolute top-4 left-4 p-2 bg-blue-600 text-white rounded-full shadow-md"
      >  <AiOutlineArrowLeft size={24} /> </button>

        </div>

      </div>
    </>
  )
}

export default UserLoginPage
