import React, { useContext } from 'react'
import NavigationBar from '../../Components/NavigationBar'
import AuthContext from '../../Providers/AuthProvider'

const Home = () => {


  const{auth} = useContext(AuthContext);
  console.log(auth.role,"vijay ");
  
  return (
    <div>
      <NavigationBar/>
    </div>
  )
}

export default Home
