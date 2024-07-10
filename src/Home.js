import React, { useEffect, useState } from 'react'
import { useNavigate , Link} from 'react-router-dom';
import axios from "axios"
import QuickBooksAuth from './QuickBooksAuth';
import Accounts from './Accounts';

function Home() {

  const [auth, setauth] = useState(false);
  const [message, setmessage] = useState("");
  const [name, setname] = useState("");
  const navigate = useNavigate();


  axios.defaults.withCredentials = true;

  useEffect(()=>{

    axios.get("http://localhost:9000")
         .then(res =>{ 
                    //    console.log(res.status)
                    //    console.log(res.data)
                    //    console.log(res.data.Status)
            if(res.data.Status === "Sucusseful"){
              setauth(true)
              console.log("responde"+ res)
              console.log("responde"+ res.data.name)
              setname(res.data.name)
                console.log("done")
                //  navigate("/login");
            }
            else{
                setauth(false)
                setmessage(res.data.Error)
            }
         })
         .then(err => console.log(err));
  },[])



  const handleDelete =()=>{
    axios.get("http://localhost:9000/logout")
    .then(res =>{
      window.location.reload(true);
    })
    .catch(err => console.log(err))
  }

  return (

    <div>
      Welcome of the Home!
      {
               auth
                 ?
          <div>
             <h3>You are authorize : {name}</h3>
             <button className='btn btn-danger' onClick={handleDelete}>Logout</button> <br/><br/><br/>

             <QuickBooksAuth/>
             <Accounts/>
          </div> 

                :
          <div>
            <h3>{message}</h3>
            <h3>Login now</h3>
            <Link Link to="/login" className='btn btn-success' type='submit'>Login</Link>
          </div> 

      }


    </div>
  )
}

export default Home
