import styled from "styled-components";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../Contexts/UserContext";

import Login from "./Login";
import Signup from "./Signup";
import Subscriptions from "./Subscriptions";
import Plan from "./Plan";
import Home from "./Home";
export default function App() {  
  const initState=[];
  const [user,setUser]=useState(initState)
  return (
    <Content>      
      <BrowserRouter>
      <UserContext.Provider value={{user,setUser}}>
      <Routes>       
        <Route path="/" element={<Login />}/>        
        <Route path="/sign-up" element={<Signup/>}/>
        <Route path="/subscriptions/" element={<Subscriptions />}/>
        <Route path="/subscriptions/:ID_DO_PLANO" element={<Plan/>}/>
        <Route path="/home" element={<Home/>}/>
        
      </Routes>
      </UserContext.Provider>
      </BrowserRouter>
    </Content>
  )
}
const Content=styled.div`
`

