import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UseForm } from "./Useform";
export default function Signup() {
  const [form, handleForm] = UseForm({})
  const navigate = useNavigate();
  function SendForm(e) {
    e.preventDefault();
    LoggingIn()
  }
  function LoggingIn() {
    const newForm = [{ email: form.email, name: form.name, cpf: form.cpf, password: form.password }]
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up", newForm[0])
    promise.then(HandleSucess)
    promise.catch(HandleError)
  }
  function HandleSucess() {
    navigate("/")
  }
  function HandleError() {
    alert("Ocorreu um problema, tente mais tarde")
  }
  return (
    <Content>
      <form onSubmit={SendForm}>
        <input required placeholder="Nome" type={"text"} name="name" value={form.name || ""} onChange={handleForm} />
        <input required placeholder="CPF" type={"text"} name="cpf" value={form.cpf || ""} onChange={handleForm} />
        <input required placeholder="E-mail" type={"email"} name="email" value={form.email || ""} onChange={handleForm} />
        <input required placeholder="Senha" type={"password"} name="password" value={form.password || ""} onChange={handleForm} />
        <button>CADASTRAR</button>
      </form>
      <Link to="/" >
        <div className="link">Já possui uma conta? Entre</div>
      </Link>
    </Content>
  )
}
const Content=styled.div`
height: 100vh;
background-color: black;
font-family: 'Roboto';
color:white;

form{
  margin-left: 10vw;
  margin-right: 10vw;
  display:flex;
  flex-direction: column;
  padding-top:40vw;
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

