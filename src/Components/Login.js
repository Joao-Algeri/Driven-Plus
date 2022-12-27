import styled from "styled-components";
import axios from "axios";
import Logo from "../Imgs/Logo.png"
import {useContext, useState} from 'react';
import UserContext from "../Contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { UseForm } from "./Useform";
export default function Login() {
  const [form, handleForm] = UseForm({})
  const {user,setUser}=useContext(UserContext)
  const navigate = useNavigate();
  function SendForm(e) {
    e.preventDefault();
    LoggingIn()
  }
  function LoggingIn() {
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/login", form)
    promise.then(HandleSucess)
    promise.catch(HandleError)
  }
  function HandleSucess(request) {
    if (request.membership == null) {
      // console.log(request)     
      // console.log(request.data.token);
      
      setUser(request.data);      
      navigate("/subscriptions/")
      
    }
    else {
      navigate("/home")
    }

  }
  function HandleError() {
    alert("Ocorreu um problema, tente mais tarde")
  }
  
  return (
    <Content>
      <img src={Logo} alt="Logo" />
      <form onSubmit={SendForm}>
        <input required placeholder="E-mail" type={"email"} name="email" value={form.email || ""} onChange={handleForm} />
        <input required placeholder="Senha" type={"password"} name="password" value={form.password || ""} onChange={handleForm} />
        <button>ENTRAR</button>
      </form>
      <Link to="/sign-up">
        <div className="link"> Não possui uma conta? Cadastre-se</div>
      </Link>
    </Content>
  )
}
const Content=styled.div`
height: 100vh;
background-color: black;
font-family: 'Roboto';
color:white;
img{
  width: 80vw;
  margin-left: 10vw;
  margin-right: 10vw;
  margin-top:20vw;
}
form{
  margin-left: 10vw;
  margin-right: 10vw;
  display:flex;
  flex-direction: column;
  margin-top:15vw;
  }
input{
  height: 52px;
  margin-bottom:16px;
  border-radius: 8px;
  border:none;
  padding-left: 14px;
    }   
button{
  height: 52px;
  border-radius: 8px;
  background-color: #FF4791;
  color:white;
  font-weight: 700;
  font-size: 14px;
  border:none;
  margin-top: 8px;
  margin-bottom: 24px;
  }

.link{
  display: flex;
  width: 60vw;
  justify-content: center;
  align-items: center;
  margin-left: 20vw;
  margin-right: 20vw;
  font-size: 14px;
  font-weight: 400;
  color:white;
  text-decoration:underline;
}
`

