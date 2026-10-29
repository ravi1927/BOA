import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import "../css/left.css";
import "../css/right.css";
import image from "../../assets/BoA logo.png";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';
import { FaceOutlined,FingerprintOutlined,PasswordOutlined } from "@mui/icons-material";

import axios from "axios";
import {getConfig} from "../../lib";

toast.configure()

const LoginTypes = () => {

  const navigate = useNavigate();

  var CredintialData = localStorage.getItem("credintial");
  

  console.log('test',CredintialData)

  return (
    
    <div class="d-flex justify-content-center"id="contentContainer" >
    <div id="containerLeft">
        
    </div>
    <div id="containerRight">
    <center><Link to="/"><img src={image} id="logoImg" alt=""/></Link> </center><br/><br/>
        {/* {CredintialData === 'PASSWORD' ? 

            <div id="passwordContainer" >
            <dl>
                <Link class="btn btn-light" id="adminButtons" to="/password">Password</Link>
                <dd></dd>
            </dl><br/>

            <input type="submit" class="btn btn-warning w-100 rounded rounded-pill" value="Submit" />
            </div>
        
        : null}



        {CredintialData === 'FACE' ? 

        <div id="passwordContainer" >
        <dl>
            
            <Link class="btn btn-light" id="adminButtons" to="/face">Face</Link>
            <dd></dd>
        </dl><br/>

        <input type="submit" class="btn btn-warning w-100 rounded rounded-pill" value="Submit" />
        </div>

        : null}


            {CredintialData === 'FINGERPRINT' ? 

            <div id="passwordContainer" >
            <dl>
                <dt id="pswText">FingerPrint</dt>
                <dd></dd>
            </dl><br/>
            <Link class="btn btn-light" id="adminButtons" to="/finger">Finger</Link>
            <input type="submit" class="btn btn-warning w-100 rounded rounded-pill" value="Submit" />
            </div>

            : null}


            {CredintialData === 'FACE,FINGERPRINT' ? 

            <div id="passwordContainer" >
            <dl>
            <Link class="btn btn-light" id="adminButtons" to="/face">Face</Link>
            <Link class="btn btn-light" id="adminButtons" to="/finger">Finger</Link>
                <dd></dd>
            </dl><br/>

            <input type="submit" class="btn btn-warning w-100 rounded rounded-pill" value="Submit" />
            </div>

            : null} */}



                {/* {CredintialData === 'FACE,FINGERPRINT,PASSWORD' ?  */}

                <div style={{'marginTop':'100px'}}>
                <dl>
                {CredintialData.includes('FACE') ? 

                <Link class="btn btn-light" id="adminButtons" to="/face" style={{'borderRadius':'100%' , "backgroundColor":"#F1AB15",'height':'85px','width':'85px','margin':'10px'}}><FaceOutlined  htmlColor={'#FFF'}  style={{fontSize: '4rem'}}/></Link>:null}
                 {CredintialData.includes('FINGERPRINT') ? 
                <Link class="btn btn-light" id="adminButtons" to="/finger" style={{'borderRadius':'100%',"backgroundColor":"#F1AB15",'height':'85px','width':'85px','margin':'10px'}}> <FingerprintOutlined  htmlColor={'#FFF'}
                                     style={{fontSize: '4rem'}}/></Link>:null}
                 {CredintialData.includes('PASSWORD') ? 
                <Link class="btn btn-light" id="adminButtons" to="/password" style={{'borderRadius':'100%',"backgroundColor":"#F1AB15",'height':'85px','width':'85px','margin':'10px'}}><PasswordOutlined  htmlColor={'#FFF'}
                                     style={{fontSize: '4rem'}}/></Link>:null}
                    <dd></dd>
                </dl><br/>

                <input type="submit" class="btn btn-warning w-100 rounded rounded-pill" value="Submit" />
                </div>

                {/* : null} */}
      {/* <div id="passwordContainer" >
        <dl>
            <dt id="pswText">password</dt>
            <dd></dd>
        </dl><br/>
        
        <input type="submit" class="btn btn-warning w-100 rounded rounded-pill" value="Submit" />
      </div> */}
        
    </div>
   </div>
    
  );
};

export default LoginTypes;