import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { message } from 'antd';

function Signup() {


    const navigate = useNavigate();
    const[values, setvalues] = useState({
        name :"",
        email:"",
        password:""
    });



    function submit(e){
         e.preventDefault();
         
         //-----sending values to server---- 
         axios.post("http://localhost:9000/signup", values)
         .then(res =>{ 
                    //    console.log(res.status)
                    //    console.log(res.data)
                    //    console.log(res.data.Status)
            if(res.data.Status === "Sucusseful"){
                console.log("done")
                 navigate("/login");
            }
            else{
                message.error("Please Signup first ")
            }
         })
         .then(err => console.log(err));
    }
    
  return (
    <div style={{marginTop:"12%", width: "31% ", alignItems:"center", marginLeft:"39%"}} >
       
       {/* <div className='p-3 bg-white w-25'> */}
           <form onSubmit={submit} style={{height:"49vh",background :"grey",padding:"3%"}}>

               <div className='mb' >
                   <label style={{marginLeft:"-79%", fontSize:"21px"}} htmlFor='name'>Name</label>
                   <input style={{}} className='form-control' type='text' placeholder='Enter name'  onChange={(e)=> setvalues({...values, name :e.target.value})}/>
               </div>

               <div className='mb-3'>
                   <label style={{marginLeft:"-79%", fontSize:"21px"}} htmlFor='email'>Email</label>
                   <input style={{}} className='form-control' type='email' placeholder='Enter email'  onChange={(e)=> setvalues({...values, email :e.target.value})}/>
               </div>

               <div className='mb-3 ' style={{}}> 
                   <label  style={{marginLeft:"-79%", fontSize:"21px"}}  htmlFor='password'>Password</label>
                   <input style={{}} className='form-control' type='password' placeholder='Enter Password' onChange={(e)=> setvalues({...values, password :e.target.value})}/>
               </div>

               <button className='btn btn-success' type='submit'> Signup</button>
               <Link to="/login">Already have account , Login</Link>
           </form>
       {/* </div> */}

    </div>
  )
}

export default Signup
