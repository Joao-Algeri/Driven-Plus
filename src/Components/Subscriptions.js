import styled from "styled-components";
import axios from "axios";
import UserContext from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useEffect } from "react";
export default function Subscriptions() {
  const navigate = useNavigate()
  const { user } = useContext(UserContext);
  const [plans, setPlans] = useState([])
  const config = { headers: { Authorization: `Bearer ${user.token}` } }
  useEffect(() => {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships", config)
    promise.then(Sucess);

    promise.catch(Failure)
  }, [])

  function Sucess(request) {
    setPlans(request.data);
  }
  function Failure() {
    alert("Ocorreu um erro, tente mais tarde")
  }
  if (plans == undefined || plans == null || plans == "") {
    return <div className="loading">Loading</div>
  }
  function ShowPlan(id) {
    navigate(`/subscriptions/${id}`)
  }
  return (
    <Content>
      <div className="title">Escolha seu Plano</div>
      {plans.map((plan) =>
        <div onClick={() => ShowPlan(plan.id)} key={plan.id} className="plan">
          <img key={plan.image} src={plan.image} alt="plan icon" />
          <div key={plan.price} className="price">R$ {plan.price}</div>
        </div>
      )}

    </Content>
  )
}
const Content=styled.div`
height: 100vh;
background-color: black;
font-family: 'Roboto';

font-weight: 700;
.title{
  color: white;
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80vw;
  margin-left: 10vw;
  margin-right: 10vw;
  margin-bottom: 24px;
  padding-top: 29px;
}
.plan{
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 78vw;
  height: 27vh;
  border-radius: 12px;
  border:3px solid #7E7E7E;
  margin-left: 11vw;
  margin-right: 11vw;
  margin-bottom: 10px;
}
.price{
  color:white;
  font-size: 24px;
}
.loading{
  width: 100vw;
  height: 100vh;
  background-color: black;
  color:red;
}
`

