import styled from "styled-components";
import axios from "axios";
import UserContext from "../Contexts/UserContext";
import { useContext } from "react";
export default function Home() {
  const {user}=useContext(UserContext);
  
  return (
    <Content>

    </Content>
  )
}
const Content=styled.div`
`

