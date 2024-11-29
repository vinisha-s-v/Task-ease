import React, { useState } from 'react';
import BackgroundImage from '../../assets/user/backimg.avif'
import { MdPassword } from 'react-icons/md';
import axios from 'axios';

const Register = () => {

    const Register =()=>{
        const [formData,setFormData] = useState({
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            
        });
    }

   const [error,setError]=useState('');

   const handleChange =(e)=>{

    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })

   }

    const handleSubmit =async (e)=>{
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
          }

        //   try{
        //     const response =await axios.post('http://localhost:8080/auth/register'),{
        //         // firstName:formData.firstName,
        //     }
        //   }
        //   catch{

        //   }

        
    }
  return (
    <div className='min-h-screen bg-cover bg-center flex flex-col justify-center items-center'
    // style={{backgroundImage:"url('BackgroundImage')"}}
    >

        <div className='bg-white bg-opacity-90 py-8 px-6 shadow-lg rounded-lg sm:max-w-md w-full' >
              <h2 className='text-2xl font-bold text-center text-blue-600'>Sign in</h2>


              <form className='mt-6 space-y-4 ' onSubmit={handleSubmit}>
                 {/* {error && (
                    <div className='text-red-500 text-sm text-center'>{error}</div>
                 )} */}

                 <div>
                 <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>


            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              className="block w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            //    value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              className="block w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            //   value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="block w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            //   value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="block w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            //   value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>
                 
              </form>
        </div>
      
    </div>
  );
}

export default Register;
