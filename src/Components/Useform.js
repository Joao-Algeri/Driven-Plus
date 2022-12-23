import { useState } from "react";

function UseForm(initState={}){
    const [form,setForm]=useState(initState)
    
    function handleForm({target:{value,name}}){
        setForm({
            ...form,
            [name]: value,
        })
}
return [form,handleForm]
}
export {UseForm};