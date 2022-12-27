import styled from "styled-components";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UseForm } from "./Useform";
import UserContext from "../Contexts/UserContext";
import checklist from "../Imgs/Checklist.png"
import moneybill from "../Imgs/Moneybill.png"
export default function Plan({ token }) {
  const { user, setUser } = useContext(UserContext);
  const { ID_DO_PLANO } = useParams();
  const [planData, setPlanData] = useState([])
  const [perks, setPerks] = useState([])
  const [form, handleForm] = UseForm({})
  const navigate = useNavigate();

  const config = { headers: { Authorization: `Bearer ${user.token}` } }
  
  useEffect(() => {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${ID_DO_PLANO}`, config)
    promise.then(Sucess)
    promise.catch(Failure)
  }, [])
  function Sucess(request) {
    setPlanData(request.data)
    setPerks(request.data.perks)

  }
  function Failure() {
    alert("Ocorreu um erro, tente mais tarde")
  }
  function SendForm(event) {
    event.preventDefault();
    Purchase()
  }
  function Purchase() {
    form.securityNumber = Number(form.securityNumber);
    form.cardNumber = form.cardNumber
    const body = { membershipId: planData.id, ...form };
     

    const promise = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", body, config)
    promise.then(HandleSucess);

    promise.catch(HandleFailure)


  }
  function HandleSucess(request) {
    const body = { membershipId: planData.id, ...form };
    const newUser = { ...user }
    newUser.image = request.data.membership.image;
    newUser.perks = request.data.membership.perks;
    newUser.cardInfo = {...body}    
    setUser(newUser);
    navigate("/home")
  }
  function HandleFailure() {
    alert("Ocorreu um erro, tente mais tarde")
  }
  return (
    <Content>
      <img className="logo" src={planData.image} />
      <div className="title">{planData.name}</div>
      <div className="title-box">
        <img className="icon" src={checklist} alt="checklist" />
        <div>Benefícios:</div>
      </div>
      <div className="perks-box">
        {perks.map((perk, index) => <div className="perk" key={perk.id*55}>{index + 1}. {perk.title}</div>)}
      </div>
      <div className="title-box">
        <img className="icon" src={moneybill} alt="moneybill" />
        <div>Preco:</div>
      </div>
      <div className="perks-box">
        <div className="perk" >R$ {planData.price} cobrados mensalmente</div>
      </div>
      <form onSubmit={SendForm}>
        <input className="normal-input" required placeholder="Nome impresso no cartão" type={"text"} name="cardName" value={form.cardName || ""} onChange={handleForm} />
        <input className="normal-input" required placeholder="Dígitos do cartão" type={"text"} name="cardNumber" value={form.cardNumber || ""} onChange={handleForm} />
        <input className="small-input left-input" required placeholder="Código de segurança" type={"number"} name="securityNumber" value={form.securityNumber || ""} onChange={handleForm} />
        <input className="small-input right-input" required placeholder="Validade" type={"text"} name="expirationDate" value={form.expirationDate || ""} onChange={handleForm} />
        <button>ASSINAR</button>
      </form>
    </Content>
  )
}
const Content=styled.div`
height: 100vh;
background-color: black;
color:white;
font-family: 'Roboto';
padding-bottom: 20vw;
.logo{
  width: 44vw;
  margin-left: 33vw;
  margin-right: 33vw;
  margin-top: 87px;  
}
.title{
  width: 44vw;
  margin-left: 33vw;
  margin-right: 33vw;
  margin-top: 12px;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 22px;
}
.title-box{
  display: flex;
  margin-left: 44px;
  margin-bottom: 10px;
}
.icon{
  width: 3vw;
  margin-right: 5px;
}
.perks-box{
  margin-left: 44px;
  margin-bottom: 12px;
}
.perk{
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 2px;
}
form{
  width: 80vw;
  /* height: 52px; */
  margin-left: 10vw;
  /* margin-bottom: 10vw; */
  flex-wrap: wrap;
  display: flex;
  /* flex-direction: column; */
  /* border-radius: 8px; */
}
input{
  padding-left: 14px;
}
.normal-input{
  width: 100%;
  height: 52px;
  margin-bottom: 8px;
  border-radius: 8px;
}
.small-input{
  width:38vw;
  border-radius: 8px;
  height: 52px;
  margin-bottom: 8px;
  box-sizing: border-box;
  
}
.left-input{
  margin-right:2vw;
}
.right-input{
  margin-left:2vw;
}
button{
  width: 100%;
  background:#FF4791;
  color:white;
  font-size: 14px;
  font-weight: 700;
  justify-content: center;
  height: 52px;
  border-radius: 8px;
}
`

