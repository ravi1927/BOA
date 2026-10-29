import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {toast} from 'react-toastify';
import image from'../../assets/BoA logo.png';
import "../css/left.css";
import "../css/right.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import {getConfig} from "../../lib";

toast.configure()

const Login = () => {
    const navigate = useNavigate();
    const[mobile,setMobile] = useState("");

    const fingerarray = [];

    function HandelSubmit(){
        if(mobile === ''){
            //alert('Please Enter Mobile Number')
            toast('Please Enter Mobile Number')
        }else if(mobile.length < 9){
            toast('Mobile number lenght Not Matched')
        }
        
        else{
            axios({  
                method: 'get',  
                url: `${getConfig("API_URL")}/user/credential?attribute-name=MobileNumber&attribute-value=${mobile}`,  
                
              }).then(res => {
                //alert(res.data[0].id)
                //console.log('test',res.data.data.identityNumber)
                 localStorage.setItem('Id', res.data.data.identityNumber);
                 localStorage.setItem('credintial', res.data.data.credentials);
                 localStorage.setItem('fingerarray', JSON. stringify(res.data.data.fingerPositions));
                 
                if((res.data.data.identityNumber!='')){
                    navigate('/logintypes', { replace: true });
                } else {
                    alert('Please provide correct details')
                }
                
               }).catch(err => { 
                // console.log('adssadhdjdvh',err.response)
                alert('Login Failed');
               
              })
        }
    }

    return(
        <>
        <div
      className="d-flex justify-content-center align-items-center"
      id="contentContainer">
      <div id="containerLeft">
        <h2 id="regTextTwo">Bank 24/7 with our virtual banking</h2>
        <p id="regType">Discover more ways to bank than ever</p>
      </div>
      <div id="containerRight" className="homeContainer">
        <center><img src={image} id="logoImg" alt=""/></center><br/><br/>
        <p id="regTextMain">Web Admin</p>
        <p id="mobileText">Please Enter Mobile Number</p>
       
       <div className="input-group" >
            <select className="input-group-text number form-select w-25" style={{'height':'50px'}}>
                <option>+251</option>
            </select>
            
             <input type="text" style={{'height':'50px'}}  required className="form-control w-75" placeholder="Enter Mobile Number"  onChange={e=>setMobile(e.target.value)} /> 
                 
                    
        </div>
        {/* <button type="submit" id="Button"  >SUBMIT</button> */}

        {/* <input type="submit" className=" btn btn-warning w-100 mt-4 rounded" variant="warning" value="Submit" onClick={HandelSubmit}/> */}

        <input type="submit" className=" btn btn-warning w-100 mt-4 rounded" variant="warning" value="Submit" onClick={HandelSubmit}/>
       
           
    </div>
    </div>
        </>
        
    );
}

export default Login;
