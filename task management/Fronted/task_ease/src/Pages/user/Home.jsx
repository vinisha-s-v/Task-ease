import React, { useContext } from 'react'
import NavigationBar from '../../Components/NavigationBar'
import AuthContext from '../../Providers/AuthProvider'
import { Outlet } from 'react-router-dom';

const Home = () => {


  const{auth} = useContext(AuthContext);
  console.log(auth.role,"vijay ");
  
  return (
    <div>
      <NavigationBar/>
      
      
      <div>
        {<Outlet />}
      </div>
    </div>
  )
}

export default Home
