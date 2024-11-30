import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import AuthContext from '../../Providers/AuthProvider';


const UserLoginPage = () => {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('')
    const[error,setError]=useState('')
    const Navigate =useNavigate();
    const { setAuth } = useContext(AuthContext)


        const handleSubmit = async(e)=>{
          e.preventDefault();
        try{
            console.log(email,password);
            
            const response=await axios.post("http://localhost:8080/auth/authenticate",{
                email,password
            })
            setAuth({
                token:response.data.token,
                email: response.data.email,
                 role: response.data.role

            })

            if(response.status===200 && response.data.token){
              
                localStorage.setItem("authToken",response.data.token)
                Navigate('/task');
              
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
  return (
    <>
      <div className='min-h-screen flex items-center bg-gray-100 justify-center'>
        <div className='bg-white p-8 rounded-lg w-full max-w-md'>
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
            <a href='#' className='text-indigo-600 hover:text-indigo-500'>Forgot your password?</a>
          </div>

        </div>

      </div>
    </>
  )
}

export default UserLoginPage
