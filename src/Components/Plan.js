import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";
export default function Plan({token}) {
  if (token!==undefined){
    console.log(token);
    const config={headers:{Authorization:token}}
    console.log(config)
    const promise=axios.get("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/1",config)
     promise.then(Sucess)
    promise.catch(Failure)
  }
  function Sucess(request){
    console.log(request)
  }
  function Failure(){
    console.log("deu errado")
  }
  
  
  return (
    <Content>
      <div className="title">Escolha seu plano</div>
      <div className="plan">
        {/* <img src=""/> */}
      </div>
    </Content>
  )
}
const Content=styled.div`
height: 100vh;
background-color: black;
`

