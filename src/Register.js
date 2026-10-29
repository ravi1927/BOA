import React from "react";
import "./left.css";
import "./right.css";
import image from'./assets/BoA logo.png';

import 'bootstrap/dist/css/bootstrap.css';

const Register = () => {
  return (
    
        <div
      className="d-flex justify-content-center align-items-center"
      id="contentContainer">
      <div id="containerLeft">
        <h2 id="regTextTwo">Bank 24/7 with our virtual banking</h2>
        <p id="regType">Discover more ways to bank than ever</p>
      </div>
      <div id="containerRight" className="homeContainer">
        <center><img src={image} id="logoImg" alt=""/></center><br/><br/>
        <p id="regTextMain">Registration</p>
        <p id="mobileText">Please Enter Mobile Number</p>
       <form >
       <div className="input-group" >
            <select className="input-group-text number form-select w-25" style={{'height':'50px'}}>
                <option>+251</option>
                <option>+253</option>
                <option>+259</option>
                <option>+258</option>
            </select>
            
             <input type="text" style={{'height':'50px'}} pattern="[\d]{10}"  required className="form-control w-75" placeholder="Enter Mobile Number"/> 
                 
                 <p id="para2"></p>     
        </div>
        <button type="submit" id="Button"  className=" btn btn-warning w-100 mt-4 rounded" variant="warning">SUBMIT</button>
       </form>
           
    </div>
    </div>
    
  );
};

export default Register;
