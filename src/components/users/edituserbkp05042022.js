import React, {useState} from "react";
import {toast} from 'react-toastify';
import "../css/left.css";
import "../css/right.css";
import image from'../../assets/BoA logo.png';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import {getConfig} from "../../lib";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()


const UpdateUser = () => {
  const navigate = useNavigate();

  const[emobile,setEmobile] = useState("");

  const[erole,setErole] = useState("");

  const[estatus,setEstatus] = useState("");

  const[epass,setEpass] = useState("");

  var x = localStorage.getItem("Id");

  var tk = localStorage.getItem("token");

  function EdUser(){
    if(emobile === ''){
        
        toast('Please Enter Mobile Number')
    }else if(erole === ''){
        
        toast('Please Select Role')
    }else if(estatus === ''){
        
        toast('Please Select Status')
    }else if(epass === ''){
      
      toast('Please Enter Password')
    }else{
        axios({  

            method: 'patch',  
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer '+tk,
              },

            //   https://api.boamw.aptiway.com/api/user/${emobile}
            //   https://identity-int.bankofabyssinia.com/api/user/{identityNumber}
            url: `${getConfig("API_URL")}/user/${x}`, 
            data: JSON.stringify({"role":erole,"status":estatus,"password":epass}) 
            
          }).then(res => {
            //alert(res.data[0].id)
            //console.log('test',res.data.status)
            if(res.data.status === 'COMPLETED'){
                alert('User Updated Succefully');
                navigate("/userupdate", { replace: true });
            }else{
                alert('User Updated Created');
                navigate("/userupdate", { replace: true });
            }
            
           }).catch(err => { 
             console.log('adssadhdjdvh',err.response.data)
            alert('User Not Updated');
            navigate("/dashboard", { replace: true });
          })
    }
}
  return (
    
        <div
      className="d-flex justify-content-center align-items-center"
      id="contentContainer">
      <div id="containerLeft">
        <h2 id="regTextTwo">Update User</h2>
      </div>
      <div id="containerRight" className="homeContainer">
        <a href="/dashboard"><center><img src={image} id="logoImg" alt=""/></center><br/><br/></a>
        <div className="d-flex justify-content-between mt-4">
        <p className="mt-2">Identity Number</p>
        
        <input type="text" className="form-control" style={{'height':'50px','width':'60%'}} name="mnumber" onChange={e=>setEmobile(e.target.value)}/>
        </div>
        <div className="d-flex justify-content-between mt-2">
        <p className="mt-2">Role</p>

        <select name="role" onChange={e=>setErole(e.target.value)} className="form-select" style={{'height':'50px','width':'60%'}}>
                <option value="">Select</option>
                <option value="PRIMORDIAL_USER">PrimordialUser</option>
                <option value="AGENT">Agent</option>
                <option value="SELF_KYC_CLIENT">Selfkycclient</option>
                <option value="LEVEL_ONE_ADJUDICATOR">Leveloneadjudicator</option>
                <option value="LEVEL_TWO_ADJUDICATOR">Leveltwoadjudicator</option>
                <option value="USER_MANAGER">Usermanager</option>
            </select>
        </div>
        <div className="d-flex justify-content-between mt-2">
        <p className="mt-2">Status</p>
       

        <select name="status" onChange={e=>setEstatus(e.target.value)} className="form-select" style={{'height':'50px','width':'60%'}}>
                <option value="">Select</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
            </select>
        </div>

        <div className="d-flex justify-content-between mt-4">
        <p className="mt-2">Password</p>
        
        <input type="text" className="form-control" style={{'height':'50px','width':'60%'}} name="mnumber" onChange={e=>setEpass(e.target.value)}/>
        </div>




        {/* <button type="submit" id="Button" style={{'marginTop':'100px'}}  className=" btn btn-warning w-100 rounded" variant="warning">UPDATE</button> */}

        <input type="submit" name="submit" onClick={EdUser} value="Submit"  style={{'marginTop':'40px'}}  className=" btn btn-warning w-100 rounded" variant="warning"/>
        <center>
            {/* <a href="" className="btn btn text-warning">Create Another User</a> */}

            <Link className="btn btn text-warning" to="/user"> CREATE USER </Link>
        </center>
    </div>
    </div>
    
  );
};

export default UpdateUser;
