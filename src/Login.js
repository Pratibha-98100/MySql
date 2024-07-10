import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { message } from 'antd';

function Login() {


    const navigate = useNavigate();
    const[values, setvalues] = useState({
        email:"",
        password:""
    });


    axios.defaults.withCredentials = true;

    function submit(e){
         e.preventDefault();
         console.log(values)
         //-----sending values to server---- 
         axios.post("http://localhost:9000/login", values)
         .then(res =>{   
            console.log(res.data)                                                                                                                                               // console.log(res)
            if(res.data.Status === "Sucusseful"){
                console.log("done")
                 navigate("/");
            }
            // else{
            //     alert("Please Login first ")
            // }
         })
         .then(err => console.log(err));
    }
    
    
  return (
    <div style={{marginTop:"12%", width: "31% ", alignItems:"center", marginLeft:"39%"}} >
       
           <form onSubmit={submit} style={{height:"49vh",background :"grey",padding:"3%"}}>

               <div className='mb-3'>
                   <label style={{marginLeft:"-79%", fontSize:"21px"}} htmlFor='email'>Email</label>
                   <input className='form-control' type='email' placeholder='Enter email'  onChange={(e)=> setvalues({...values, email :e.target.value})}/>
               </div>

               <div className='mb-3 ' style={{}}> 
                   <label  style={{marginLeft:"-79%", fontSize:"21px"}}  htmlFor='password'>Password</label>
                   <input  className='form-control' type='password' placeholder='Enter Password' onChange={(e)=> setvalues({...values, password :e.target.value})}/>
               </div>

               <button className='btn btn-success' type='submit'> Login</button>
               
               <Link to="/signup">Don't have account , Signup</Link>
           </form>

    </div>
  )
}

export default Login
