import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import "../css/left.css";
import "../css/right.css";
import image from "../../assets/BoA logo.png";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";
import {getConfig} from "../../lib";

toast.configure()

const Password = () => {
  const navigate = useNavigate();

  const[password,setPassword] = useState("");

  var x = localStorage.getItem("Id");

  function HandelSubmit(){

    const encodedData = btoa(password); // encode a string
    //console.log(encodedData);

    if(password===''){
      toast('Please Enter Password')
    }else{

      axios({  

        method: 'post',  
        headers: {
             // Add any auth token here
            'content-type': 'application/json'
          },
        url: `${getConfig("API_URL")}/user/${x}/token`, 
        data: JSON.stringify({"credentialType":"PASSWORD","credential":encodedData}) 
        
      }).then(res => {
        //alert(res.data[0].id)
        //console.log('test',res.data.data.accessToken)
        localStorage.setItem('authtoken', res.data.data.accessToken);
        localStorage.setItem('Displayname', res.data.data.displayName);

        localStorage.setItem('Branch', res.data.data.branchId);

        if((res.data.data.accessToken!='')){
          navigate('/dashboard', { replace: true });
        }else{
            alert('Token Not Generated')
        }
        
       }) ;

    }

    
}

  return (
    
    <div class="d-flex justify-content-center"id="contentContainer" >
    <div id="containerLeft">
        
    </div>
    <div id="containerRight">
    <center><img src={image} id="logoImg" alt=""/></center><br/><br/>
      <div id="passwordContainer" >
        <dl>
            <dt id="pswText">password</dt>
            <dd><input type="password" class="form-control" onChange={e=>setPassword(e.target.value)} style={{'height':'50px'}}/></dd>
        </dl><br/>
        {/* <a href="dashboard.html"><button  >SUBMIT</button></a> */}
        <input type="submit" class="btn btn-warning w-100 rounded rounded-pill" value="Submit" onClick={HandelSubmit}/>
      </div>
        
    </div>
   </div>
    
  );
};

export default Password;