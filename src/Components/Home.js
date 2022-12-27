import styled from "styled-components";
import axios from "axios";
import UserIcon from "../Imgs/UserIcon.png"
import UserContext from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
export default function Home() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const config = { headers: { Authorization: `Bearer ${user.token}` } }
  function ChangeSubscription() {
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", user.cardInfo, config)
    promise.then(Sucess);

    promise.catch(Failure)
  }

  function Sucess() {
    navigate("/subscriptions")
  }
  function Failure() {
    alert("Ocorreu um erro, tente mais tarde")
  }
  function CancelSubscription() {
    const promise = axios.delete("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", config)
    promise.then(Sucess);
    promise.catch(Failure)
  }
  function VisitPage(path) {
    window.location = path;
  }
  return (
    <Content>
      <div className="top-box">
        <img className="logo" src={user.image} alt="Driven Logo"/>
        <img className="user-icon" src={UserIcon} alt="User Icon"/>
      </div>
      <div className="title">Olá, {user.name}</div>
      <div className="perks-box">
      {user.perks.map((perk)=><button onClick={()=>VisitPage(perk.link)} key={perk.id}>{perk.title}</button>)}
      </div>
      <div className="button-box">
      <button onClick={()=>ChangeSubscription()}>Mudar plano</button>
      <button onClick={()=>CancelSubscription()}className="red">Cancelar plano</button>
      </div>
    </Content>
  )
}
const Content=styled.div`
height: 100vh;
background: black;
font-family:"Roboto";
.top-box{
  display: flex;
  width: 84vw;
  margin-left: 8vw;
  margin-right: 8vw;
  padding-top: 22px;
  justify-content: space-between;
}
.logo{
  width: 13vw;
}
.user-icon{
  width: 9vw;
}
.title{
  display: flex;
  justify-content: center;
  width: 50vw;
  margin-left: 25vw;
  margin-right: 25vw;
  margin-bottom: 53px;
  font-size: 24px;
  font-weight: 700;
  color:white;
}
.perks-box{
  display: flex;
  flex-direction: column;
}
button{
  width: 80vw;
  background:#FF4791;  
  justify-content: center;
  color:white;
  height: 52px;
  margin-left: 10vw;
  margin-right: 10vw;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 8px;
  border:none;
}
.button-box{
  position:fixed;
  bottom:5px;
}
.red{
  background: #FF4747;
}
`