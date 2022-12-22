import styled from "styled-components";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Signup from "./Signup";
import Subscriptions from "./Subscriptions";
import Home from "./Home";
import Login from "./Login";
export default function App() {
  return (
    <Content>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/sign-up" element={<Signup/>}/>
        <Route path="/subscriptions/:ID_DO_PLANO" element={<Subscriptions/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
      </BrowserRouter>
    </Content>
  )
}
const Content=styled.div`
`

