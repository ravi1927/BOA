import React, {useState,useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Index = () => {
    const navigate = useNavigate();

    // var auth = localStorage.getItem("Displayname");

    // //console.log('dfsdfs',auth);

    // if(auth =='null'){
    //     navigate("/", { replace: true });
    // }


window.onunload = () => {
        // Clear the local storage
        localStorage.clear();
     }
    

    function handlelogout() {
        localStorage.clear();
        navigate("/", { replace: true });
      }

      var x = localStorage.getItem("Id");
      console.log(x)
    // if(x === null){
    //     navigate("/", { replace: true });
    // }

    useEffect(()=>{
        if(x === null){
            navigate("/", { replace: true });
        }
    
    },[])

    return(
        <div>
        
        <div id="newBG">
    <div id="buttonss">
        <div>
            {/* <button class="btn btn-light" id="adminButtons"></button> */}
            <Link class="btn btn-light" id="adminButtons" to="/user"> CREATE USER </Link>
            
        </div>
        <div>
            {/* <button class="btn btn-light" id="adminButtons"></button> */}
            <Link class="btn btn-light" id="adminButtons" to="/useredit">UPDATE USER</Link>
        </div>
    </div>
    <center>
    <div style={{'padding-right': '235px'}}>
            {/* <button class="btn btn-light" id="adminButtons"></button> */}
            
            <button class="btn btn-light" id="adminButtons" onClick={handlelogout} style={{'position':'absolute','top':'70%','padding-left':'40'}}>Logout</button>
            
        </div></center>
    </div>
    </div>


    );

}
export default Index;
