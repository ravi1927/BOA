import React from "react";
import "../css/left.css";
import "../css/right.css";
import image from'../../assets/BoA logo.png';
import image2 from'../../assets/check_circle_black_24dp.png';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';

const CreateUserSuc = () => {
  return (
    
        <div
      className="d-flex justify-content-center align-items-center"
      id="contentContainer">
      <div id="containerLeft">
        <h2 id="regTextTwo" className="mb-4">Create User</h2>
        <div className="d-flex justify-content-center mt-4">
        <div id="message" style={{'marginTop':'100px'}}>
             <img id="messageImg" src={image2} />
             <p id="messageText" >User Created Successfully</p>
             {/* <a href="/create-user" >Create Another User</a> */}
             <Link className="btn btn text-warning" id="adminButtons" to="/user"> Create Another User </Link>
         </div>
         </div>
      </div>
      <div id="containerRight" className="homeContainer">
        <center><img src={image} id="logoImg" alt=""/></center><br/><br/>
        <div className="d-flex justify-content-between mt-4">
        <p className="mt-2">Mobile Number</p>
        <input type="text" className="form-control"  style={{'height':'50px','width':'60%'}} name="" id="" />
        </div>
        <div className="d-flex justify-content-between mt-2">
        <p className="mt-2">Role</p>
        <select name="" id="" className="form-select" style={{'height':'50px','width':'60%'}}>
            <option value="Agent">Agent</option>
            <option value="Customer">Customer</option>
        </select>
        </div>
        <div className="d-flex justify-content-between mt-2">
        <p className="mt-2">Status</p>
        <select name="" id="" className="form-select" style={{'height':'50px','width':'60%'}}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
        </select>
        </div>
        <button type="submit" id="Button"  className=" btn btn-warning w-100 mt-4 rounded" variant="warning" disabled>SUBMIT</button>
    </div>
    </div>
    
  );
};

export default CreateUserSuc;