import React, { useState } from 'react'


const AuthContext =React.createContext({});

export const AuthProvider = ({children}) => {

    const[auth,setAuth]=useState({
        token:'',
        firstName:'',
        email:'',
        role:''
    })
  return (
    <div>
      <AuthContext.Provider value={{auth,setAuth}}>
        {children}  
      </AuthContext.Provider>
    </div>
  )
}

export default AuthContext
