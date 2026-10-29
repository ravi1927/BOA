import React, {useState,useEffect} from "react";
import {toast} from 'react-toastify';
import "../css/left.css";
import "../css/right.css";
import image from'../../assets/BoA logo.png';
import {Link, useNavigate} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";
import {getConfig} from "../../lib";

toast.configure()


const CreateUser = () => {
    const navigate = useNavigate();

    const[cmobile,setCmobile] = useState("");

    const[name,setName] = useState("");

    const[role,setRole] = useState("");

    const[branch,setBranch] = useState("");

    const[status,setStatus] = useState("");

    const[identity,setIdentity] = useState("");

    var tk = localStorage.getItem("authtoken");

    // var name = localStorage.getItem("Displayname");

    // var branch = localStorage.getItem("Branch");

    //console.log('sada',name);

    const [rstatus, setrStatus] = React.useState(0)

    var x = localStorage.getItem("Id");

    useEffect(()=>{
      if(x === null){
          navigate("/", { replace: true });
      }
  
  },[])

    const radioHandler = (rstatus) => {
      setrStatus(rstatus);
    };

    function drawYesContent(){

      return(
        <>
          <div className="d-flex justify-content-between mt-4">
        <p className="mt-2">Mobile Number</p>
        <input type="text" className="form-control" name="mnumber"  style={{'height':'50px','width':'60%'}} onChange={e=>setCmobile(e.target.value)} />
        </div>
        </>
      );
    }

    function drawNoContent(){
      return(
        <>
          <div className="d-flex justify-content-between mt-4">
        <p className="mt-2">Identity Number</p>
        <input type="text" className="form-control" name="idnumber"  style={{'height':'50px','width':'60%'}} onChange={e=>setIdentity(e.target.value)} />
        </div>
        </>
      );
    }

    

    function CreateUser() {

      //console.log(cmobile,role,status);


      if(rstatus === 1){

        if(cmobile === ''){
            
          toast('Please Enter Mobile Number')
      }
      else if(name === ''){
          
        toast('Please Enter Name')
    }
      else if(role === ''){
          
          toast('Please Select Role')
      }else if(branch === ''){
          
        toast('Please Select Branch')
    }else if(status === ''){
          
          toast('Please Select Status') 
        }else{
          axios({  

            method: 'post',  
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer '+tk,
              },
            url: `${getConfig("API_URL")}/user`, 
            data: JSON.stringify({"attributeName":"MobileNumber","attributeValue":cmobile,"role":role,"displayName":name,"branchId":branch,"status":status}) 
            
          }).then(res => {
            //alert(res)
            //console.log('test',res)
            if(res.data.status === 'COMPLETED'){
                alert('User Created Succefully');
                navigate("/usersucess", { replace: true });
            }else{
                alert('User Not Created');
                navigate("/dashboard", { replace: true });
            }
            
           }).catch(err => { 
            // console.log('adssadhdjdvh',err.response)
            alert('User Not Created');
            navigate("/dashboard", { replace: true });
          })
        }
        
      }else{


        if(identity === ''){
          toast('Please Enter Identity Number') 
        }else if(role === ''){
          
          toast('Please Select Role')
      }
      else if(name === ''){
          
        toast('Please Enter Name')
    }
      
      else if(branch === ''){
          
        toast('Please Select Branch')
    }else if(status === ''){
          
          toast('Please Select Status') 
        }else{

          axios({  

            method: 'post',  
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer '+tk,
              },
            url: `${getConfig("API_URL")}/user`, 
            data: JSON.stringify({"attributeName":"IdentityNumber","attributeValue":identity,"role":role,"displayName":name,"branchId":branch,"status":status}) 
            
          }).then(res => {
            //alert(res)
            //console.log('test',res)
            if(res.data.status === 'COMPLETED'){
                alert('User Created Succefully');
                navigate("/usersucess", { replace: true });
            }else{
                alert('User Not Created');
                navigate("/dashboard", { replace: true });
            }
            
           }).catch(err => { 
            // console.log('adssadhdjdvh',err.response)
            alert('User Not Created');
            navigate("/dashboard", { replace: true });
          })
        }


      }

        // if(cmobile === ''){
            
        //     toast('Please Enter Mobile Number')
        // }else if(role === ''){
            
        //     toast('Please Select Role')
        // }else if(status === ''){
            
        //     toast('Please Select Status')
        // }else{


        //     //console.log(cmobile,role,status)
        //     axios({  

        //         method: 'post',  
        //         headers: {
        //             'content-type': 'application/json',
        //             authorization: 'Bearer '+tk,
        //           },
        //         url: `https://api.boamw.aptiway.com/api/user`, 
        //         data: JSON.stringify({"attributeName":"MobileNumber","attributeValue":cmobile,"role":role,"status":status}) 
                
        //       }).then(res => {
        //         //alert(res)
        //         //console.log('test',res)
        //         if(res.data.status === 'COMPLETED'){
        //             alert('User Created Succefully');
        //             window.location = `usersucess`; 
        //         }else{
        //             alert('User Not Created');
        //             window.location = `dashboard`; 
        //         }
                
        //        }).catch(err => { 
        //         // console.log('adssadhdjdvh',err.response)
        //         alert('User Not Created');
        //         window.location = `dashboard`;

        //       })
        // }
    }


  return (
    
        <div
      className="d-flex justify-content-center align-items-center"
      id="contentContainer">
      <div id="containerLeft">
        <h2 id="regTextTwo">Create User</h2>
      </div>
      <div id="containerRight" className="homeContainer">
        <a href="/admin/dashboard"><center><img src={image} id="logoImg" alt=""/></center><br/><br/></a>

        <input type="radio" name="release"  onClick={(e) => radioHandler(1)} />Mobile Number
      <input type="radio" name="release"  onClick={(e) => radioHandler(2)} />Identity Number
      {rstatus === 1 && drawYesContent()}
      {rstatus === 2 && drawNoContent()}

        {/* <div className="d-flex justify-content-between mt-4">
        <p className="mt-2">Mobile Number</p>
        <input type="text" className="form-control" name="mnumber"  style={{'height':'50px','width':'60%'}} onChange={e=>setCmobile(e.target.value)} />
        </div> */}

      <div className="d-flex justify-content-between mt-4">
        <p className="mt-2">Name</p>
        <input type="text" className="form-control" name="Name"  style={{'height':'50px','width':'60%'}} onChange={e=>setName(e.target.value)} />
        </div>


        <div className="d-flex justify-content-between mt-2">
        <p className="mt-2">Role</p>
        

        <select name="role" onChange={e=>setRole(e.target.value)} className="form-select" style={{'height':'50px','width':'60%'}}>
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
        <p className="mt-2">Branch</p>
        

        <select name="branch" onChange={e=>setBranch(e.target.value)} className="form-select" style={{'height':'50px','width':'60%'}}>
            <option  value="">Select Branch</option>
            <option  value="1028">Arbaminch -Asrat Bldg</option>
            <option  value="1031">Addisu Gebeya -Berhan Bldg</option>
            <option  value="1039">A-Koran -Abubeker Bldg</option>
            <option  value="1041">Abinet -Gibe Com Center</option>
            <option  value="1044">Alemgena</option>
            <option  value="1097">Ayat Adebabay (Ayat Branch</option>
            <option  value="1254">AMHARA REGION STATE K02	</option>
            <option  value="1263">AA CITY BOLE SUBCITY W 12</option>
            <option  value="1107">ALAMATA BRANNCH</option>
            <option  value="1121">ADDIS ABABA BOLESUBCITY KEBELE 03</option>
            <option  value="1123">ADDIS ABABA LEBU AREA</option>
            <option  value="1055">ADAMA</option>
            <option  value="1063">AWASSA</option>
            <option  value="1075">AXUM Branch</option>
            <option  value="1073">Adigrat (Adigrat Branch)</option>
            <option  value="1086">Aratkillo Arear(Aratkillo Breanch)</option>
            <option  value="1072">AFRICA UNION (AFRICA UNION BRANCH)</option>
            <option  value="1126 ">AA GURDSHOLA K06 HN627</option>
            <option  value="1133">AFAR NATIONAL REG STATE LOGIA W04</option>
            <option  value="1134">AKAKI KALITIY W19</option>
            <option  value="1084">Adds abab (Awtobis tera Area)</option>
            <option  value="1101">Assosa (Assosa Branch)</option>
            <option  value="1104">Awda building (E-Banking Dept)</option>
            <option  value="1069">ASSELA CITY </option>
            <option  value="1023">AA NSL SUBCITY KEBELE11 HO 607</option>
            <option  value="1008">Awassa -near to Lewi No1 Hotel</option>
            <option  value="1099">AROUND BALCHA HOSPITAL</option>
            <option  value="1119">ASHEWA MEDA AREA</option>
            <option  value="1164">AA BOLE W09</option>
            <option  value="1166 ">AMHARA DEBARK K01</option>
            <option  value="1184">AA KIRKOS K06 HN832</option>
            <option  value="1185">AA ARADA SC KEBELE 07/08 HO 371</option>
            <option  value="1192">AA KIRKOS K02/03 HN676/05</option>
            <option  value="1150 ">ARERTICITY MINJAR SHEMKORA WORDA</option>
            <option  value="1153">ADDIS ZEMENE CITY</option>
            <option  value="1155">ADAMA WOREDA KEBLE 806</option>
            <option  value="8256">Application Managemant Dep't</option>
            <option  value="1151 ">ADDIS ABBA LID ETA AREA WORDA 02/03</option>
            <option  value="1168">ADDIS ABABA YEKASUCITY WOREDA 13</option>
            <option  value="1169">ADDIS ABABA ARADASUBCITY WOREDA 03</option>
            <option  value="1188">AA KIRKOS S.C WOREDA 09</option>
            <option  value="1191">AA GULELLE S.C WOREDA 08 HNO 874</option>
            <option  value="1199">ADDIS ABABA CITY ADDIS KETEMA SC </option>
            <option  value="1144">ADDIS KETEMASUBCITY K03</option>
            <option  value="1194">AMHARA REGION TILILI CITY K 01</option>
            <option  value="1195">AMHARA REGION DURBETIE CITY</option>
            <option  value="1196">AA KOLFE KERANYO W07 H 130</option>
            <option  value="8264">Administration and Logistics Dep;t</option>
            <option  value="1159">AA REGION AA CITY BOLESUCITY W02</option>
            <option  value="1160">AMHARA REGION WOLDA CITY KEBELE 01</option>
            <option  value="1161 ">AA NEFASSILK LAFTO W23 HN9999/1</option>
            <option  value="1162 ">AA BOLE K05</option>
            <option  value="1172 ">ADDIS KETEMA SUB CITY K 05 H.O 716</option>
            <option  value="1173 ">ADDIS KETEMA SUBCITY K 06 H.O 331</option>
            <option  value="1146">AA KIRKOS W01</option>
            <option  value="1148 ">AMBO KEBELE 01</option>
            <option  value="1163 ">AA ARADA W04 HN001</option>
            <option  value="1178 ">AA CITY AA SCITY YEKA W7 HN712</option>
            <option  value="1187 ">AA S.C KIRKOS W.18 K.27 HNO.301</option>
            <option  value="1207 ">AA CITY SUBSITY NSL W 06 HNO 840</option>
            <option  value="1241 ">ADDIS ABABA CITY SUBCITY BOLE K15</option>
            <option  value="1242 ">ADDIS ABABA CITY SUBCITY NSL</option>
            <option  value="1252 ">AMHARA R SHENDI W WEMBERMA K 01</option>
            <option  value="1255 ">AMHARA REGIONAL STATE K02</option>
            <option  value="1256 ">ADDIS ABABA CITY BOLE SUBCITY</option>
            <option  value="1257 ">AMHARA REG C GONDER SC MARAKI</option>
            <option  value="1258 ">AA REG C AA AC GULLELE W08 H171</option>
            <option  value="1259">AA REG C AA SC NIFASSILKLAFTO W12</option>
            <option  value="1205 ">AA CITY ARADA SUBCITY W 05 HON 1381</option>
            <option  value="1206 ">AA CITY BOLE SUBCITY W10</option>
            <option  value="1243 ">AA CITY SUBCITY NSL W20 H359</option>
            <option  value="1244 ">AA SUBCITY YEKA W12 HB-309/7</option>
            <option  value="1245 ">AA SUBCITY YEKA W7 HNO Go5-A</option>
            <option  value="1253"> ADDIS ABABA REGION W08 HNO 003/R</option>
            <option  value="1265"> AA CITY ADDIS KETEME K 17</option>
            <option  value="1266"> AA CITY KOLFE KERANIO W 13 H 1013</option>
            <option  value="1212 ">AA CITYADMIN SUBCITYKIRKOS K08 H632</option>
            <option  value="1213 ">ARSI NEGELE R OROMIA H1745</option>
            <option  value="1214 ">AMHARA R GASHENA CITY WOREDA WADEL</option>
            <option  value="1217 ">AA CITYADMIN SUBCITY AKETEMA K01</option>
            <option  value="1227 ">AMHARA REGIONAL DEGOLLO CITY W JAMA</option>
            <option  value="1229"> ADDIS ABABA CITY W01 HNO 814</option>
            <option  value="1230"> ADDIS ABABA CITY SUBCITY KIRKOS W11</option>
            <option  value="1232"> AFAR REGIONAL AWASH FENTALE HNO 217</option>
            <option  value="1234"> AMHARA REGIONAL MERAWI CITY</option>
            <option  value="1248"> AA REGION KOLFE KERANIO SUBCITY W13</option>
            <option  value="1226"> AMHARA REGIONAL STATE KOBO CITY</option>
            <option  value="1250"> AA R ADDISKETEMA SUBCITY W01 H514</option>
            <option  value="1219"> AA CITY ADMIN KIRKOS K08 H632</option>
            <option  value="1220"> AA CITY ADMIN SUBCITY NSL W03 H441</option>
            <option  value="1246"> AA CITY AKAKI KALITY SUBCITY W01</option>
            <option  value="1208 ">AA city admin subcitybole w03 H038</option>
            <option  value="1209 ">AA CITY ADMIN SUBCITYARADA W07 H126</option>
            <option  value="1210 ">AA CITY ADMIN SUBCITYBOLE W14/15</option>
            <option  value="1211 ">AA CITY ADMIN SUBCITY NSL W11 H NEW</option>
            <option  value="1223 ">AMHARA REGION LUMAME CITY K01</option>
            <option  value="1237 ">ADDIS ABABA CITY GULELE W5 HNO29</option>
            <option  value="1238 ">AA SUBCITY KOLEFE KERANIO W15</option>
            <option  value="1239 ">ADDIS ABABA CITY SUBCITY ARADA</option>
            <option  value="1270 ">AA CITY SUB-CITY YEKA W 12 H1249</option>
            <option  value="1271 ">AMHARA RE KUCH CITY W BURE K 01</option>
            <option  value="1272 ">AA SUB-CITY KOLFEKERANIO W03 H662</option>
            <option  value="1273 ">AA CITY SUB-CITY BOLE</option>
            <option  value="1275 ">AA CITY SUBCITY BOLE W 03 H 154</option>
            <option  value="1276 ">AMHARA R CITY AYIKEL W CHELGA K01</option>
            <option  value="1277 ">AMHARA R CITY MERSA K02 HNO 45</option>
            <option  value="1294 ">AA YEKA SUBCITY WOREDA 09 HNO1840</option>
            <option  value="1285 ">AA SUBCITY AKAKIKALITY W 09</option>
            <option  value="1286 ">AA SUBCITY YEKA W 08 HN 493</option>
            <option  value="1301 ">ADDIS ABEBA</option>
            <option  value="1302 ">ADDIS ABEBA</option>
            <option  value="1306 ">AA SUB CITY BOLE W 19</option>
            <option  value="1310 ">A.A SUB-CITY ARADA W 01 HN 186</option>
            <option  value="1284 ">AA SUBCITY ADDIS KETEMA W04 HNO 917</option>
            <option  value="1312 ">AMHARA R CITY ADDIS KIDAM KB 01</option>
            <option  value="1313 ">AMHARA R CITY DEBRE WORK K 01</option>
            <option  value="1315 ">AA SUB-CITY LIDETA W 10</option>
            <option  value="1316 ">AMHARA R CITY ATAYE K 01</option>
            <option  value="1317 ">AMHARA R ZO OR CITY KEMISSIE</option>
            <option  value="1318 ">AMHARA R CITY MEK EYESSUS W ESTIE</option>
            <option  value="1319 ">AMHARA R CITY HAIK K 01 HN 341</option>
            <option  value="1320 ">AMHARA R CITY DESSIE K DE/14</option>
            <option  value="1322 ">AA R CITY SUB-CITY BOLE W 12</option>
            <option  value="1323 ">AMHARA R CITY SEKOTA K 01</option>
            <option  value="1281 ">AA CITY YEKA SUBCITY W12 HNO 213</option>
            <option  value="1282 ">AA CITY SUBCITY KIRKOS K01 HNO10/4</option>
            <option  value="1283 ">AFAR REGION AFDERA CITY</option>
            <option  value="1290 ">AMHARA REGIONAL YILEMANA DENSA K02</option>
            <option  value="1291 ">AA CITY AKAKI KALITY SUBCITY W9</option>
            <option  value="1292 ">AA CITY KOLFEKERANIO W08</option>
            <option  value="1297 ">AA CITY KIRKOS SUBCITY KEBELE 01</option>
            <option  value="1345 ">AMHARA R CITY DEJEN WO DEJEN K 02</option>
            <option  value="1346 ">AA R SUB-CITY BOLE WO 11HN B423/6</option>
            <option  value="1347 ">ADDIS ABEBA CITY</option>
            <option  value="1349 ">ADAMA CITY</option>
            <option  value="1359 ">A.A REGION SUB-CITY LIDETA W 07</option>
            <option  value="1325 ">AA R SUB-CITY ADDIS KETEMA</option>
            <option  value="1326 ">AMHARA R CITY BATI K 01 HNO 599</option>
            <option  value="1354 ">AMHARA R CITY FERES BET</option>
            <option  value="1356 ">AMHAR R CITY LALIBELA K 02</option>
            <option  value="1358 ">AMHARA R CITY AZENA</option>
            <option  value="8288 ">Adama District Office </option>
            <option  value="1342 ">A.A SUB-CITY YEKA W 07 HNO 639</option>
            <option  value="1352 ">AMHARA R CITY SEDIE K 01</option>
            <option  value="1353 ">AMHARA R CITY ENEWARI W MORETENA</option>
            <option  value="8282 ">Agent Banking Dep't 8211 Support</option>
            <option  value="1412 ">ADDIS ABABA NSL W11 HN469</option>
            <option  value="1377 ">A.A REGION SUB-CITY YEKA W 13</option>
            <option  value="1378 ">A.A REGION SUB-CITY YEKA W 12</option>
            <option  value="1379 ">A.A REGION SUB-CITY YEKA W 09</option>
            <option  value="1380 ">A.A REGION SUB-CITY BOLE WO 14</option>
            <option  value="80 ">Arc Admin User</option>
            <option  value="1478 ">ADDIS ABABA CITY KIRKOS W11</option>
            <option  value="8396 ">Auxilary Infrustructure</option>
            <option  value="8412 ">Administration</option>
            <option  value="8420 ">Acquired Asset</option>
            <option  value="8422 ">Archives Management </option>
            <option  value="1482 ">AA CTY ADMIN CTY AA W K</option>
            <option  value="8334 ">Accounts and Reconciliation </option>
            <option  value="8458 ">Aulternative Channels</option>
            <option  value="1454 ">AMHARA REGION CITY GISH ABAY</option>
            <option  value="8388 ">Auxiliary System</option>
            <option  value="1505 ">AMHARA REG DEBER BIRHAN CITY</option>
            <option  value="1507 ">ADDIS CITY SUBCITY BOLE WOREDA 03</option>
            <option  value="1502 ">AA CITY ADMIN KOLFE KERANIO SUBCITY W 04</option>
            <option  value="1519 ">ADDIS ABABA SUB-C LAFTO W 03</option>
            <option  value="1486 ">AA SUBCITY BOLE W 10</option>
            <option  value="1487 ">AA SUBCITY NSL WOREDA 10</option>
            <option  value="1513 ">AA CITY ADMIN SUB-CITY BOLE W 01</option>
            <option  value="1025">Bole -TK International B;dg</option>
            <option  value="1026">Bishoftu -Lisak bldg</option>
            <option  value="1051">BOLE MEDHANIALEM (Awda buiding)</option>
            <option  value="9002">Branch manager</option>
            <option  value="9004">Branch Till Administrator</option>
            <option  value="9005">Branch Acct Admin</option>
            <option  value="1007">B-Dar -boa & nile Ins bldg</option>
            <option  value="1052">BOMB TERA (BOBTERA BLDG</option>
            <option  value="1081">BURE</option>
            <option  value="1077">BETHEL BRANCH (BETHEL AREA)</option>
            <option  value="1071">BAMBIS area(BAMBIS BRANCH)</option>
            <option  value="1127">BOLE (Haddis Alemayehu)</option>
            <option  value="1200">BICHENA CITY AMHARA REGION K 01</option>
            <option  value="1136">BAHIRDAR HIDAR11</option>
            <option  value="1142">BAHIRDAR GISH ABAY HN C41</option>
            <option  value="1143">BOLE W01 HN 1835</option>
            <option  value="8274 ">Bahir Dar District Office 8278 Mekele District Office</option>
            <option  value="1298 ">BAHIRDAR CITY</option>
            <option  value="9075 ">BAHIR DAR DISTRICT</option>
            <option  value="9076 ">BAHIR DAR DISTRICT</option>
            <option  value="9077 ">BAHIR DAR DISTRICT</option>
            <option  value="9078 ">BAHIR DAR DISTRICT</option>
            <option  value="9079 ">BAHIR DAR DISTRICT</option>
            <option  value="9080 ">BAHIR DAR DISTRICT</option>
            <option  value="9081 ">BAHIR DAR DISTRICT</option>
            <option  value="1287 ">BENISHANG MANDERACITY K01</option>
            <option  value="1355 ">BENISHANGUL GUMUZ R CITY WOMBERA</option>
            <option  value="1357 ">BENISHANGUL GUMUZ R CITY MANBUK</option>
            <option  value="8298 ">Building Administration Dep't</option>
            <option  value="27">Branch Operations Manager </option>
            <option  value="8398 ">Business Analysis And Information </option>
            <option  value="8434 ">Building Administration</option>
            <option  value="1049">Chagni City</option>
            <option  value="8210">CEO</option>
            <option  value="8215">Credit Admin</option>
            <option  value="8220">Chief Credit Business Officer</option>
            <option  value="8230">Credit Management Dep?t</option>
            <option  value="9003">Customer Service Manager</option>
            <option  value="9007">Customer Service Official</option>
            <option  value="9012">CREDIT DEPARTMENT</option>
            <option  value="9013">CREDIT DEPARTMENT</option>
            <option  value="9010">CREDIT DEPARTMENT</option>
            <option  value="9011">CREDIT DEPARTMENT</option>
            <option  value="9014">CREDIT DEPARTMENT</option>
            <option  value="9015">CHIEF CUSTOMER OFFICE </option>
            <option  value="9016">CHIEF CUSTOMER OFFICE</option>
            <option  value="8221">CREDIT APPRAISAL AND ASSESSMENT</option>
            <option  value="1061">CMC AREA </option>
            <option  value="1060">CHIRO</option>
            <option  value="1059">CHURCHIL ROAD (ELLIANA MALL)</option>
            <option  value="8216 ">Chief Information System Officer</option>
            <option  value="8218 ">Chief Digital Officer</option>
            <option  value="8214">Chief Branch Banking Officer</option>
            <option  value="8262">Card Banking Dep't</option>
            <option  value="8226">Contact Center Dep't</option>
            <option  value="8212 ">Chief Enterprise Service Officer </option>
            <option  value="8252 ">Credit Portfolio Management Dep </option>
            <option  value="9017"> CHIEF CUSTOMER OFFICE</option>
            <option  value="9018"> CHIEF CUSTOMER OFFICE</option>
            <option  value="9019"> CHIEF CUSTOMER OFFICE</option>
            <option  value="9020"> CHIEF CUSTOMER OFFICE</option>
            <option  value="9021"> CHIEF CUSTOMER OFFICE</option>
            <option  value="1202"> C DEBREELIAS W DEBREELIAS</option>
            <option  value="1203"> C BAHIRDAR W BAHIRDAR</option>
            <option  value="1204"> C BAHIRDAR K03</option>
            <option  value="9022"> CHIEF CUSTOMER OFFICE</option>
            <option  value="9023"> CHIEF CUSTOMER OFFICE</option>
            <option  value="9024"> CHIEF CUSTOMER OFFICE</option>
            <option  value="9025"> CHIEF CUSTOMER OFFICE</option>
            <option  value="9026"> CHIEF CUSTOMER OFFICE</option>
            <option  value="9027"> CHIEF CUSTOMER OFFICE</option>
            <option  value="9028"> CHIEF CUSTOMER OFFICE</option>
            <option  value="9029 ">CHIEF CUSTOMER OFFICE</option>
            <option  value="9030 ">CHIEF CUSTOMER OFFICE</option>
            <option  value="9031 ">CHIEF CUSTOMER OFFICE</option>
            <option  value="9032 ">CHIEF CUSTOMER OFFICE</option>
            <option  value="9033 ">CHIEF CUSTOMER OFFICE</option>
            <option  value="9034 ">CHIEF CUSTOMER OFFICE</option>
            <option  value="92 ">Collections Officer</option>
            <option  value="9035 ">CHIEF CUSTOMER OFFICE</option>
            <option  value="2700 ">Credit Risk</option>
            <option  value="2710 ">Credit Risk Manager </option>
            <option  value="54 ">Credit Manager</option>
            <option  value="8294 ">Credit Underwriting Dep't </option>
            <option  value="8284 ">Central Addis District Office </option>
            <option  value="2500 ">Customer Services</option>
            <option  value="61">Corporate Officer</option>
            <option  value="62">Corporate Loan Supervisor</option>
            <option  value="64 ">Corporate Loan Administrator </option>
            <option  value="65 ">Corporate Loan Supervisor</option>
            <option  value="51">Credit Officer</option>
            <option  value="52">Credit Officer</option>
            <option  value="26">Customer Service Agent </option>
            <option  value="2630 ">Credit Risk</option>
            <option  value="30 ">Call Centre Agent</option>
            <option  value="8304 ">Chief Corporate Human Resource Officer </option>
            <option  value="8306 ">Chief International Banking Officer </option>
            <option  value="67 ">Corporate Customer Service Agent </option>
            <option  value="8492 ">Construction Project </option>
            <option  value="8460 ">Corporate Legal</option>
            <option  value="8466 ">Credit Review 8488 IBB Special Branch</option>
            <option  value="8358 ">Corporate Credit</option>
            <option  value="8360 ">Commercial Credit</option>
            <option  value="8446 ">Cheque Clearance and Payments </option>
            <option  value="8430 ">Contract Adminstration </option>
            <option  value="8454 ">Customer Acquisition and Service Quality </option>
            <option  value="8456 ">Corporate Communication</option>
            <option  value="8472 ">Compliance Management </option>
            <option  value="8332 ">Card Management</option>
            <option  value="8468 ">Corporate Audit</option>
            <option  value="8362 ">Consumer and Mortgage Credit </option>
            <option  value="8432 ">Construction</option>
            <option  value="8440 ">Cash Management</option>
            <option  value="8326 ">Customer Contact Centre </option>
            <option  value="8382 ">Core System</option>
            <option  value="1015">Dire Dawa -Dechatu</option>
            <option  value="1018">Debre Brihan -Mintwab Bldg</option>
            <option  value="1019">Dilla -infront of Rendevou</option>
            <option  value="1027">Dessie -Hadgu Berhe Bldg</option>
            <option  value="1021">D-Markos-Star Buss Grp Bldg</option>
            <option  value="1038">Debre Tabor  -Hebiret Bldg</option>
            <option  value="8250">Digital Banking Operation Dep't</option>
            <option  value="1102">Dangla (Dangla Branch)</option>
            <option  value="1098">DEBRE BERHAN TAXI TERA</option>
            <option  value="8232">Deposit Mobilization Dep?t</option>
            <option  value="1138 ">DESSIE BUANBUAWUHA W10 HE3304</option>
            <option  value="1141">DEBREMARKOS </option>
            <option  value="1156">DEMECHA WOREDA KEBLE 02</option>
            <option  value="1274 ">DIRE DAW CITY K02 H8350</option>
            <option  value="1350 ">DESSIE CITY</option>
            <option  value="1351 ">DIRE DEWA CITY</option>
            <option  value="8292 ">Dire Dawa District Office</option>
            <option  value="39 ">Derivatives Front Office Dealer </option>
            <option  value="40 ">Derivatives Middle Office User </option>
            <option  value="41 ">Derivatives Back Office User</option>
            <option  value="8320 ">Deposit Product</option>
            <option  value="8290 ">Dessie District Office</option>
            <option  value="8494 ">Digital Banking Technical Support </option>
            <option  value="8390 ">Data Centre Management </option>
            <option  value="8400 ">Data Warehouse and BI Delivery </option>
            <option  value="8394 ">Database Management</option>
            <option  value="8324 ">District Business Support </option> 
            <option  value="8265">Engineering Services</option>
            <option  value="1005">EEPCO treasury -KKarebid </option>
            <option  value="9038 ">EAST ADDIS ABABA DISTRICT</option>
            <option  value="9039 ">EAST ADDIS ABABA DISTRICT</option>
            <option  value="9040 ">EAST ADDIS ABABA DISTRICT</option>
            <option  value="9041 ">EAST ADDIS ABABA DISTRICT</option>
            <option  value="9042 ">EAST ADDIS ABABA DISTRICT</option>
            <option  value="9043 ">EAST ADDIS ABABA DISTRICT</option>
            <option  value="9044 ">EAST ADDIS ABABA DISTRICT</option>
            <option  value="9045 ">EAST ADDIS ABABA DISTRICT</option>
            <option  value="9049 ">EAST ADDIS ABABA DISTRICT</option>
            <option  value="9050 ">EAST ADDIS ABABA DISTRICT</option>
            <option  value="9051 ">EAST ADDIS ABABA DISTRICT</option>
            <option  value="9052 ">EAST ADDIS ABABA DISTRICT</option>
            <option  value="9053 ">EAST ADDIS ABABA DISTRICT</option>
            <option  value="9054 ">EAST ADDIS ABABA DISTRICT</option>
            <option  value="9046 ">EAST ADDIS ABABA DISTRICT</option>
            <option  value="9047 ">EAST ADDIS ABABA DISTRICT</option>
            <option  value="9048 ">EAST ADDIS ABABA DISTRICT</option>
            <option  value="9055"> EAST ADDIS ABABA DISTRICT</option>
            <option  value="8270"> East Addis District Office</option>
            <option  value="9036 ">EAST ADDIS ABABA DISTRICT</option>
            <option  value="9037 ">EAST ADDIS ABABA DISTRICT</option>
            <option  value="91 ">Export LC Officer </option>
            <option  value="8344 ">Export and Import Business </option>
            <option  value="8428 ">Evaluation</option>
            <option  value="8370 ">EPMS</option>
            <option  value="8235">Finance & Accounts</option>
            <option  value="1006">Filwuha -Red Cross Bldg</option>
            <option  value="1064">FINOTESELAM</option>
            <option  value="1112">FLAKIT CITY </option>
            <option  value="1114">FENDEKA CITY KEBELE 01</option>
            <option  value="8228 ">Financial Accounting Dep?t</option>
            <option  value="8462 ">Foreclosure and Debt Litigation </option>
            <option  value="8442 ">FCY Fund Management </option>
            <option  value="8444 ">Financial Analysis</option>
            <option  value="8338 ">FCY Products and Services</option>
            <option  value="1020">Gofa -Infornt of Zeleke Bldg</option>
            <option  value="1022">Gerji-maag International bldg</option>
            <option  value="1030">Gulele -Hira Bldg</option>
            <option  value="1032">Gurd Shola -setema Bldg</option>
            <option  value="1011">Gonder -Sorene Bldg</option>
            <option  value="1122">GELAN FURI KEBLE 04 </option>
            <option  value="1124">GAMBELLA AREA</option>
            <option  value="1074">GONDER(Fassileds Branch)</option>
            <option  value="1135">GONDAR W20</option>
            <option  value="1092">Gerji Giorgis (Gerji 2)</option>
            <option  value="1130">GULELLE W35 HN 729</option>
            <option  value="1201">GHIMBI CITY OROMIA REGION K 03</option>
            <option  value="1193">GULELE SUB CITY W 01 H.NO 358</option>
            <option  value="1137">GONDAR W07</option>
            <option  value="1149 ">GUJI CITY ADUSHAKISO SUBCITY</option>
            <option  value="93">Guarantees Officer</option>
            <option  value="1376 ">GEDEB REGION SNNPRS CITY GEDEB</option>
            <option  value="8448 ">General Account and Reconciliation </option>
            <option  value="1040">Hossana -Adebabay</option>
            <option  value="1045">Harrar -Merema Bldg</option>
            <option  value="1046">H-Mariam -Infront Mcpty</option>
            <option  value="1048">Humera City</option>
            <option  value="1125">HAYAHULET MAZORIA AREA</option>
            <option  value="1147">HAWASSA TABOR W FARA</option>
            <option  value="8222">Human resource Management Dep?t</option>
            <option  value="HAW">HAWASSA TABOR W FARA</option>
            <option  value="8276 ">Hawassa District Office</option>
            <option  value="1299 ">HAWASA CITY</option>
            <option  value="8300 ">Human Resource Development Dep?t </option>
            <option  value="32">Head Teller</option>
            <option  value="1506 ">HARARI REG HARAR CITY K 18</option>
            <option  value="1">Implementation</option>
            <option  value="8225">INTERNAL ADUIT</option>
            <option  value="8240">Internal Audit Department</option>
            <option  value="8245">Information System</option>
            <option  value="8260">Infrastructure Management Dep't</option>
            <option  value="200">Implementation</option>
            <option  value="1050">Inside US Embassy</option>
            <option  value="8247">INFORMATION SECURITY</option>
            <option  value="1116">IMPERIAL AREA </option>
            <option  value="1154">INJIBARA CITY BANJA WOREDA</option>
            <option  value="8234">International Trade Business Dep?t</option>
            <option  value="8238">IT Security Department</option>
            <option  value="8268">Interest Free Banking Department</option>
            <option  value="90 ">Import LC Officer</option>
            <option  value="8470 ">It Audit</option>
            <option  value="8404 ">IT Security Operation Centre</option>                                                 
            <option  value="8348 ">IFB Business</option>
            <option  value="8402 ">IT Security Assessment & Change Mgt </option>
            <option  value="8350 ">IFB Product</option>
            <option  value="8356 ">IFB Appraisal</option>
            <option  value="8342 ">International Business Operation </option>
            <option  value="8346 ">International Trade Operation </option>
            <option  value="8354 ">IF Finance Business</option>
            <option  value="1013">Jimma-Hermata plc Bldg	</option>
            <option  value="1066">JIJIGA</option>
            <option  value="1076">JEMO area</option>
            <option  value="1089">Jinka Branch(Jinka)</option>
            <option  value="1348 ">JIMMA CITY</option>
            <option  value="8286 ">Jimma District Office </option>
            <option  value="1024">kality -Solomon Yirdaw Bldg</option>
            <option  value="1078">KOTEBE AREA</option>
            <option  value="1080">KOMBOLCHA (KOMBOLCHA BRANCH)</option>
            <option  value="1087">Karakore Area (Karakore Branch)</option>
            <option  value="1094">KALITY TOTAL AREA </option>
            <option  value="1129">KOLEF KERANYO W01 HN 051</option>
            <option  value="1131">KIRKOS W3 K4 HN334 HAILU ABEBE BULD</option>
            <option  value="1058">KOLFE KERANIO W04</option>
            <option  value="1065">KAZANCHIS  (NEGA BLDG)</option>
            <option  value="1037">Lafto -Yomar Bldg</option>
            <option  value="1053">LEGEHAR (HABTU BLDG)</option>
            <option  value="1095">LIDETA CONDOMININUM</option>
            <option  value="1110">LEGETAF KEBELE01</option>
            <option  value="8242">Legal Dep't</option>
            <option  value="1140">LIDETA W 06 HN.070</option>
            <option  value="1174 ">LIDETA SUN CITY K 03</option>
            <option  value="2600 ">Lending Division</option>
            <option  value="1033">Motta -Achamyeleh Bldg</option>
            <option  value="1016">Merkato -Raguel Church</option>
            <option  value="1035">Megenagna-Legesse Flke Bldg</option>
            <option  value="1047">Modjo -Total Bldg</option>
            <option  value="1003">Merkato - Tana Bldg</option>
            <option  value="1012">Mekelle -Tadesse Hagos Bldg</option>
            <option  value="1262">MEKELE CITY KEDAMAY WOYANE KEBELE</option>
            <option  value="1068">METEMA (INFRONT OF MILLENIUM HOTEL</option>
            <option  value="1105">Metu (Metu Branch)</option>
            <option  value="1056">MERKATO AREA</option>
            <option  value="1057">MEKELE</option>
            <option  value="1083">MESKEL FLOWER</option>
            <option  value="1108">Moenco area (Moenco Branch)</option>
            <option  value="8246">Market Research and product Development Dep't</option>
            <option  value="1109 ">MEKANESELAM</option>
            <option  value="1111">MILITERY TERA</option>
            <option  value="1091 ">Mesalemia Branch (Mesalemia area)</option>
            <option  value="1103">Mertolemariam (Mertolemariam br)</option>
            <option  value="1145">MEKASSA KEBELE11</option>
            <option  value="8254">Management Information System (MIS) Dep't</option>
            <option  value="1300 ">MEKELLE CITY</option>
            <option  value="9088 ">MEKELE DISTRICT</option>
            <option  value="9089 ">MEKELE DISTRICT</option>
            <option  value="9090 ">MEKELE DISTRICT</option>
            <option  value="9091 ">MEKELE DISTRICT</option>
            <option  value="9092 ">MEKELE DISTRICT</option>
            <option  value="9093 ">MEKELE DISTRICT</option>
            <option  value="9094 ">MEKELE DISTRICT</option>
            <option  value="8418">Maintenance</option>
            <option  value="8438 ">Monitoring and Evaluation</option>
            <option  value="9095 ">MEKELE DISTRICT</option>
            <option  value="1014">Nazereth -Haji detamo Bldg</option>
            <option  value="1042">Near to Atlas Hotel</option>
            <option  value="1120">NEKEMTE AREA </option>
            <option  value="1198">NEFAS MEWCHA CITY</option>
            <option  value="1139">NEFAS SILK LAFTO W3</option>
            <option  value="8392 ">Network Management</option>
            <option  value="1029">Olompia -Getu Bldg</option>
            <option  value="1264">OROMIA RE WOLISO CITY K 02 </option>
            <option  value="1165">OROMIA MEKI W DUGDA BOREA</option>
            <option  value="1167">ORAMIA SEMENSHEWA GERAR JARSO K04</option>
            <option  value="1189">OROMIA REGION DUKEM CITY K GOGECHA</option>
            <option  value="1170">OROMIA REGION BURAYU CITY W WELMERA</option>
            <option  value="1240 ">OROMIA REGIONAL STATE CITY BOTE</option>
            <option  value="1215 ">OROMIA REGIONAL STATE MOYALE CITY</option>
            <option  value="1216 ">OROMIA R NEJO CITY H0211</option>
            <option  value="1218 ">OROMIA R ADOLA CITY K02</option>
            <option  value="1267"> OROMIA SHASHEMENE ARADA</option>
            <option  value="1231"> OROMIA REGIONAL DUKEM CITY</option>
            <option  value="1233"> OROMIA REGIONAL DEMBIDOLO CITY</option>
            <option  value="1247"> OROMIA REGION BEDELE CITY HNO 036</option>
            <option  value="1249"> ORMIA R HOLETA CITY W WOLEMERA H148</option>
            <option  value="1224"> OROMIA R CITY GERBE GURACHA K01</option>
            <option  value="1251">OROMIA REGION HARAMAYA CITY</option>
            <option  value="1222 ">OROMIA REGIONAL STATE JIMMA CITY</option>
            <option  value="1225 ">OROMIA REGIONAL SULULTA CITY K 01</option>
            <option  value="1235 ">OROMIA REGIONAL CITY BATU K02</option>
            <option  value="1269 ">OROMIA R ETEYA CITY K 01</option>
            <option  value="1303 ">OROMIA R ARSI ROBE CITY K 01</option>
            <option  value="1304 ">OROMIA REGION CITY YABELLO</option>
            <option  value="1305 ">OROMIA REGION CITY GHINNIR</option>
            <option  value="1295 ">OROMIA REGION NEGELE CITY</option>
            <option  value="1296 ">OROMIA REGION SHASHEMENE CITY</option>
            <option  value="1311 ">OROMIA R CITY SENDAFA KEBELE 01</option>
            <option  value="1289 ">OROMIA SHASHEMENE W5 HNO31</option>
            <option  value="1293 ">OROMIA SULUTMIZAN KEBELE KENBRE</option>
            <option  value="8280 ">Online Banking Dep't</option>
            <option  value="1339 ">OROMIA R CITY HARINA SUB-CITY ARADA</option>
            <option  value="1340 ">OROMIA R CITY BEDESSA K 01</option>
            <option  value="1341 ">ORMOIA R CITY ADAMA K GEDA</option>
            <option  value="1480"> OROMIA RS CTY MODJO W LUMIE K02 NEW</option>
            <option  value="1481 ">OROMIA RS CTY TULUBOLO W BECHO</option>
            <option  value="1535 ">OROMIA REG CITY ADAMA WOREDA ADAMA KEBELE 07</option>
            <option  value="1536 ">OROMIA REG CITY ASSELA WOREDA ADAMA K07 HNO604</option>
            <option  value="1517">OROMIA REG CITY GELEMSO K 02</option>
            <option  value="1518 ">OROMIA REG CITY GELEMSO K 02</option>
            <option  value="1503 ">OROMIA REG BURAYU CITY KEB LEKU KETA</option>
            <option  value="1516 ">OROMIA REG CITY AWEDAY K 02</option>
            <option  value="8384 ">Online System</option>
            <option  value="1504 ">OROMIA REG MATA GAFARSA W ARERO</option>
            <option  value="8241">PROC & PROPERTY ADMIN</option>
            <option  value="1017">Piazza-Near Mohammud Bldg</option>
            <option  value="8266">Procurement Dep't</option>
            <option  value="8248 ">Program Management Dep't</option>
            <option  value="14 ">Private Corporate Action Officer </option>
            <option  value="74 ">PWM Relationship Manager 1</option>
            <option  value="75 ">PWM Relationship Manager </option>
            <option  value="77 ">PWM Portfolio Administrator </option>
            <option  value="8406 ">Project Management</option>                                                      
            <option  value="8496 ">Project Business Analysis </option>
            <option  value="8452 ">Promotion and Brand Management</option>
            <option  value="8328 ">Quality Assurance and Technical Support </option>
            <option  value="1034">Reche -Astara Bldg</option>
            <option  value="8255">Retail Banking</option>
            <option  value="8244 ">Risk and Compliance Dep't </option>
            <option  value="1175 ">R OROMIA CITY BISHOFTU W ADEA</option>
            <option  value="1176 ">R DDAWA CITY ADMIN CITY DDAWA W09</option>
            <option  value="1177 ">R AA CITY AA SCITY ARADA W09 HN741</option>
            <option  value="1179 ">R AMHARA SCITY GINBOT20 W BDAR</option>
            <option  value="1180 ">R AMHARA SCITY WERETA W WERETA HN01</option>
            <option  value="1181 ">R AA CITY AA SCITY AKAKI KALITY K10</option>
            <option  value="1182 ">R OROMIA CITY ROBE</option>
            <option  value="1183 ">R OROMIA CITY GOBA K MISRAK</option>
            <option  value="1307 ">R AA SUB CITY BOLE W 04</option>
            <option  value="1308 ">R AA SUB CITY YEKA W 01</option>
            <option  value="1309 ">R AA SUB CITY ARADA W 01</option>
            <option  value="1331 ">R OROMIA CITY BABILE</option>
            <option  value="1332 ">R AMHARA CITY MOLALE K 01</option>
            <option  value="1333 ">R A.A SUB-CITY BOLE W 10 K 03</option>
            <option  value="1334 ">R HARARI CITY HARAR K 15</option>
            <option  value="1335 ">R AMHARA CITY MEHAL MEDA K 01</option>
            <option  value="1336 ">R AMHARA CITY DEBRE BRHAN K 15</option>
            <option  value="1337 ">R A.A SUB-CITY ADDIS KETEMA W 01</option>
            <option  value="1338 ">R A.A SUB-CITY ADDIS KETEMA W 01</option>
            <option  value="1327 ">R OROMIA CITY BEKOJI K 01</option>
            <option  value="4 ">Retail Banking</option>
            <option  value="1343 ">R S/N/N/P/R/S CITY DILLA WO 02</option>
            <option  value="1344 ">R TIGIRAY CITY MAICHEW K 02</option>
            <option  value="1360 ">REGION S/N/N/P/R/S CITY HALABA</option>
            <option  value="1362 ">REGION AA CITY SUB CITY YEKA W 04</option>
            <option  value="1363 ">REGION GAMBELA CITY GAMBELA K 01</option>
            <option  value="1364 ">REGION AMHARA CITY BAHIR DAR K 04</option>
            <option  value="1365 ">REGION AA SUB-CITY NIFASSILK LAFTO</option>
            <option  value="1361 ">REGION DIRE DEWA CITY DIRE DEWA</option>
            <option  value="2510 ">Retail Banking</option>
            <option  value="28 ">Retail Credit Officer</option>
            <option  value="29 ">Retail Credit Manager </option>
            <option  value="33">Retail Payments Officer</option>
            <option  value="34">Retail Payments Supervisor </option>
            <option  value="35 ">Retail Collector</option>
            <option  value="36 ">Retail Collection Manager</option>
            <option  value="1328 ">R AMHARA CITY LALIBELA</option>
            <option  value="1329 ">R OROMIA CITY METEHARA K 01</option>
            <option  value="1330 ">R A.A SUB-CITY KOLFE W 13 K 03</option>
            <option  value="1396 ">REGION OROMIA CITY ADAMA W ADAMA</option>
            <option  value="1411 ">REGION AMHARA CITY WEGDI</option>
            <option  value="1431"> REGION OROMIA CITY SAGURE W 02</option>
            <option  value="1432 ">REGION AMHARA CITY GINAGER K 01</option>
            <option  value="1433 ">REGION AMHARA CITY CHACHA K 01</option>
            <option  value="1434 ">REGION OROMIA CITY SHENO K 02</option>
            <option  value="1435 ">REGION AMHARA CITY LEMI K 01</option>
            <option  value="1436 ">REGION A.A SUB-CITY NIFAS SILK</option>
            <option  value="1437 ">REGION OROMIA SUB-CITY HARAMAYA</option>
            <option  value="1438 ">REGION SOMALI REGIONAL STATE</option>
            <option  value="1439 ">REGION DIRE DAWA CITY DIRE DAWA</option>
            <option  value="1415 ">REGION A.A CITY DUKEM</option>
            <option  value="1416 ">REGION A.A SUB-CITY BOLE</option>
            <option  value="1417 ">REGION A.A SUB-CITY BOLE W 10</option>
            <option  value="1418 ">REGION A.A SUB-CITY KOLFIE W 07</option>
            <option  value="1419 ">REGION A.A SUB-CITY BOLE W 14</option>
            <option  value="1420 ">REGION A.A SUB-CITY BOLE W 14</option>
            <option  value="1447 ">REGION A.A SUB-CITY YEKA W 08</option>
            <option  value="1448 ">REGION SNNPRS CITY MIZAN</option>
            <option  value="1449 ">REGION OROMIA CITY LIMU W KOSE</option>
            <option  value="1397 ">REGION SNNPRS CITY HOSSANA</option>
            <option  value="1398 ">REGION A.A SUB-CITY KOLFE KERANIO</option>
            <option  value="1399 ">REGION SNNPRS CITY DENBOYA</option>
            <option  value="1400 ">REGION TIGRAY CITY EDAGA HAMUS</option>
            <option  value="1401 ">REGION TIGRAY CITY DANSHA</option>
            <option  value="1421 ">REGION OROMIA CITY AGARO W GOMA</option>
            <option  value="1422 ">REGION A.A SUB-CITY AKAKI KALITY</option>
            <option  value="1423 ">REGION GAMBELLA CITY METI</option>
            <option  value="1424 ">REGION OROMIA CITY JIMMA</option>
            <option  value="1425 ">REGION OROMIA CITY KUMBABE W 01</option>
            <option  value="1369 ">REGION TIGRAY SUB-CITY KED WOYANE</option>
            <option  value="1370 ">REGIION TIGRAY SUB-CITY HAWILTI</option>
            <option  value="1371">REGION TIGRAY SUB-CITY HAWILTI</option>
            <option  value="1372 ">REGION TIGRAY CITY MEKELE</option>
            <option  value="1373 ">REGION TIGRAY SUB-CITY HADNET</option>
            <option  value="1374 ">REGION AA SUB-CITY BOLE</option>
            <option  value="1388 ">REGION SNNPRS CITY DURAME</option>
            <option  value="1389 ">REGION A.A SUB-CITY YEKA</option>
            <option  value="1390 ">REGION A.A SUB-CITY N/S/LAFTO</option>
            <option  value="1440 ">REGION A.A SUB-CITY YEKA W 08</option>
            <option  value="1441 ">REGION A.A SUB-CITY YEKA W 12</option>
            <option  value="1442 ">REGION OROMIA CITY OLENCHITY K 01</option>
            <option  value="1443 ">REGION OROMIA CITY GUTIN K 01</option>
            <option  value="1444 ">REGION ORMOIA CITY SHAMBU K 02</option>
            <option  value="1387 ">REGION TIGRAY CITY ADIGUDOM</option>
            <option  value="1402 ">REGION TIGRAY CITY MEKELE</option>
            <option  value="1403 ">REGION TIGRAY CITY MAI KADRA</option>
            <option  value="1404 ">REGION TIGRAY CITY SHIRARO</option>
            <option  value="1405 ">REGION SNNPRS CITY AREKA</option>
            <option  value="1406 ">REGION TIGRAY CITY GERHU SRNAY</option>
            <option  value="1407 ">REGION SNNPRS CITY DOYOGENA</option>
            <option  value="1408 ">REGION TIGRAY CITY ENTICHO</option>
            <option  value="1445 ">REGION OROMIA CITY BONGA W 02</option>
            <option  value="1375 ">REGION SNNPRS CITY HAWASSA</option>
            <option  value="1385 ">REGION A.A SUB-CITY ADDIS KETEMA</option>
            <option  value="1386 ">REGION TIGRAY CITY KOREM</option>
            <option  value="1391 ">REGION A.A SUB-CITY ARADA W 07</option>
            <option  value="1392 ">REGION OROMIA CITY BISHOFTU W 06</option>
            <option  value="1393 ">REGION A.A SUB-CITY BOLE W 04</option>
            <option  value="1394 ">REGION A.A SUB-CITY KIRKOS W 05</option>
            <option  value="1395 ">REGION DIRE DAWA CITY DIRE DEWA</option>
            <option  value="1409 ">REGION AMHARA CITY DEBRE SINA</option>
            <option  value="1410 ">REGION AMHARA CITY WUCHALE</option>
            <option  value="1426 ">REGION GAMBELLA CITY DIMAK 01</option>
            <option  value="1427 ">REGION AMHARA CITY D/BIRHAN K 07</option>
            <option  value="1428 ">REGION OROMIA CITY ADAM K 09</option>
            <option  value="1429 ">REGION AMHARA CITY MERHABETE K 03</option>
            <option  value="8302 ">International Business Dep't</option>
            <option  value="1368 ">REGION OROMIA CITY SEBETA W 02</option>
            <option  value="1381 ">REGION OROMIA CITY HASSASA W 02</option>
            <option  value="1382 ">REGION SOMAIL CITY JIJIGA K 05</option>
            <option  value="1383 ">REGION OROMIA CITY HURUTA K 01</option>
            <option  value="1384 ">REGION AFAR CITY AWASH ARBA K 01</option>
            <option  value="1413 ">REGION OROMIA CITY BAKO W 01</option>
            <option  value="1414 ">REGION A.A SUB-CITY ARADA</option>
            <option  value="1430">REGION OROMIA CIRY ASENDABO</option>
            <option  value="1446 ">REGION OROMIA CITY GOBESA K 01</option>
            <option  value="1450 ">REGION TIGRAY CITY MEKELE</option>
            <option  value="1451 ">REGION A.A SUB-CITY BOLE W 01</option>
            <option  value="1452 ">REGION A.A SUB-CITY LIDETA W 04</option>
            <option  value="1467 ">REGION AMHARA CITY MEKOY</option>
            <option  value="1468 ">REG AMHARA CITY GISHABAY K12</option>
            <option  value="1469 ">REGION AMHARA CITY AMANUEL</option>
            <option  value="1470 ">REGION AMHARA CITY CHAGNI</option>
            <option  value="1366 ">REGION A.A NIFAS SILK LAFTO</option>
            <option  value="1367 ">REGION AMHARA CITY BAHIR DAR</option>
            <option  value="1462 ">REGION AMHARA CITY DEBRE TABOR K 04</option>
            <option  value="1463 ">REGION HARARI CITY HARAR</option>
            <option  value="1464 ">REGION AFAR CITY SEMERA</option>
            <option  value="1465 ">REGION AFAR CITY DICHE OTO</option>
            <option  value="1466 ">REGION AMHARA CITY MAJETIE</option>
            <option  value="1461 ">REGION OROMIA CITY ADAMA</option>
            <option  value="1471 ">REGION AMHARA CITY REBU'I GEBEYA</option>
            <option  value="1457">REGION OROMIA CITY ADAMA</option>
            <option  value="1458 ">REGION OROMIA CITY ASSELA</option>
            <option  value="1455 ">R TIGRAY CITY SHIRE ENDESLASSIE</option>
            <option  value="1456">REGION AMHARA CITY KEMISIE</option>                                                 
            <option  value="1459 ">REGION AMHARA CITY BALCHI</option>
            <option  value="1460 ">REGION HARARI SUB-CITY HARAR</option>
            <option  value="1491">REGION TIGRAY CITY HAGERE SELAM</option>
            <option  value="1492 ">REGION TIGRAY CITY AGULAE</option>                                                   
            <option  value="1472 ">REGION AMHARA CITY BURIE</option>
            <option  value="1473 ">REGION A.A SUB-CITY KOLFE KERANIO</option>
            <option  value="1474 ">REGION AMHARA CITY WEGELTENA K 01</option>
            <option  value="1475 ">REGION OROMIA CITY JIMMA</option>
            <option  value="1476 ">REGION AA SUB-CITY NEFAS SILK LAFTO</option>
            <option  value="1477 ">REGION AA SUB-CITY NEFAS SILK LAFTO</option>
            <option  value="1527 ">REGION DIRE DAWA CITY DD KEBELE 07</option>
            <option  value="1528 ">REGION SOMALI CITY GIJIGA</option>
            <option  value="1529 ">REGION AMHARA CITY KOMBOLCHA KEB 03</option>
            <option  value="1530 ">REG TIGRAY CTY MEKELE SC DEUBE</option>
            <option  value="8464 ">Risk Management</option>
            <option  value="1501 ">REGION A.A SUB-CITY LIDATA W 05</option>                                                    
            <option  value="1531 ">REGION OROMIA CITY MIESO K 03</option>
            <option  value="1534 ">REGION SNNPRS CITY SHINSHICHO</option>
            <option  value="1543 ">REGION S/N/N/P/R/S CITY WERABE</option>
            <option  value="1544 ">REGION AMHARA CITY DESSIE W 08</option>
            <option  value="1545 ">REGION AMHARA CITY KOLADEBA KEB 02</option>
            <option  value="1546 ">REGION S/N/N/P/R/S CITY EMDEBER</option>
            <option  value="1496 ">REGION AMHARA CITY DESSIE</option>
            <option  value="1497 ">REGION TIGRAY REGIONAL STATE</option>
            <option  value="1498 ">REGION TIGRAY KEBELE 01</option>
            <option  value="1510 ">REGION TIGRAY CITY MEKELE K ADIHAKI</option>
            <option  value="1512 ">REG AA SCITY ADDIS KETEMA W02 H544</option>
            <option  value="1521 ">REGION A.A SUB-CITY BOLE W 10</option>
            <option  value="1522 ">R DIRE DEWA CITY DIRE DEWA K 03</option>
            <option  value="1548 ">REG AA CITY AA SBC BOLE KEB 12</option>
            <option  value="1553 ">R OROMIA CTY SIRE K 01 HN 575</option>
            <option  value="1554 ">REG OROMIA CTY METEHARA K 01</option>
            <option  value="1555 ">REG OROMIA CTY DIKSIS K 02</option>
            <option  value="1556 ">REG OROMIA CTY BELE GESGAR K 01</option>
            <option  value="1557 ">REG OROMIA CTY ABOMSA K 14</option>                                                
            <option  value="1489 ">REGION TIGRAY CITY BIZET</option>
            <option  value="1490 ">REGION TIGRAY CITY MEKELE</option>
            <option  value="1509 ">REG AA SCITY KOLFE KERANIO H15/16</option>                                               
            <option  value="1520"> REG AA SBC LIDETA W04 HN 364/367</option>
            <option  value="1523 ">R OROMIA CITY MECHARA K 02</option>
            <option  value="1524 ">R OROMIA CITY MECHARA K 02</option>
            <option  value="1559 ">REGION A.A SUB-CITY KOLFE KERANIO</option>
            <option  value="1560 ">REGION OROMIA CITY DHERA KEBELE 01</option>
            <option  value="1561 ">REGION SNNPRS CITY GIDOLE WOREDA DERASHE</option>
            <option  value="1562 ">REGION SNNPRS CITY GUNCHIRE WOREDA ENEMOR AND EANER</option>
            <option  value="1563 ">REGION OROMIA CITY GUNDE MESKEL WOREDA DERA KEBELE 02</option>
            <option  value="1488 ">REGION AMHARA CITY WEREBABO K 01</option>
            <option  value="1532 ">REGION S/N/N/P/R/S</option>
            <option  value="1533 ">REGION AMHARA CITY HARBU KEB 01</option>                                             
            <option  value="1537 ">REG OROMIA CITY ETEYA W ETOSA K01</option>
            <option  value="1538 ">REGION OROMIA CITY BOTE</option>
            <option  value="1539 ">REG AA CITY AA S C YEKA W05 HNO 274</option>
            <option  value="1549 ">REGION AMHARA CITY DESSIE KEB 08</option>
            <option  value="1550 ">REG S/N/N/P/R/S CTY LAHA W MELKOZA</option>
            <option  value="1551 ">R OROMIA C KOKA K BANA NEGEWO H364</option>
            <option  value="1552 ">REG OROMIA C ADAMA KB DEGAGA</option>
            <option  value="1558 ">R OROMIA CTY ADAMA K GADA</option>
            <option  value="1564 ">REGION ADDIS ABABA SUB CITY KIRKOS</option>
            <option  value="1511 ">REGION TIGRAY CITY FREWEYNI</option>
            <option  value="1525 ">REGION OROMIA CITY ARSI NEGELE</option>
            <option  value="1540 ">REGION S/N/N/P/R/S CITY BUTAJIRA</option>
            <option  value="1541 ">REGION AA SB-C ADDIS KETEMA W 10</option>
            <option  value="1542 ">REGION AA SUB-C KOLF KERANIO W 05</option>
            <option  value="1547 ">REG AA CITY AA SBC ARADA W05 HN 182</option>
            <option  value="1565 ">REGION A.A SUB-CITY AKAKI KALITY</option>
            <option  value="1566 ">REG AA SBC ADDIS KETEMA W01</option>
            <option  value="1493 ">REGION TIGRAY CITY AXUM</option>
            <option  value="1494 ">REGION TIGRAY REGINONAL STATE</option>
            <option  value="1495 ">REGION TIGRAY CITY ADAWA</option>
            <option  value="1499 ">REGION SNNPRS CITY HOSSANA</option>
            <option  value="1500 ">REGION TIGRAY REGIONAL STATE</option>                                                 
            <option  value="1584 ">REGION A.A SUB-CITY ARADA W 01</option>
            <option  value="1587 ">REG AA CITY AA W 07</option>
            <option  value="1594 ">REGION A.A SUB-CITY Kirkos W 8</option>
            <option  value="1609 ">R HARARI C JIMMA W JIMMA H572</option>
            <option  value="1610 ">R AA C AA SBC LIDETA W8</option>
            <option  value="1614 ">REGION A.A SUB-CITY YEKA W 09</option>
            <option  value="1617 ">REG AMHARA CT SEMADA W SEMADA</option>
            <option  value="1618 ">R AMHARA C INJIBARA W BANJASHEKUDA</option>
            <option  value="1631 ">REG OROMIA CT KERSA W MUNESA</option>
            <option  value="1644 ">REGION SNNPRS CITY KARAT</option>
            <option  value="1646 ">REGION SNNPRS CITY MIZAN AMAN</option>
            <option  value="1581 ">REGION ADDIS ABABA WOREDA 01 HNO 780/LE</option>
            <option  value="1582 ">REGION AMHARA CITY MOTA KEBELE 03 HNO NEW</option>
            <option  value="1583 ">REG AMHARA CT AKESTA K 1</option>
            <option  value="1592 ">REGION A.A SUB-CITY BOLE W 17</option>
            <option  value="1593 ">REGION SIDAM CITY HAWASSA</option>                                                
            <option  value="1611 ">R AA C AA SC NIFAS SILK LAFTO W01</option>
            <option  value="1612 ">R AA C AA SC KOLFE KERANIO K09</option>
            <option  value="1616 ">REG SNNPRS CT AMEYA W KONTA K02</option>
            <option  value="1621 ">REGION OROMIA CITY HARAMAYA</option>
            <option  value="1624 ">REG AMHARA CT ANKOBER</option>
            <option  value="1575 ">REG TIGRAY C WUKRO K HAYELOM</option>
            <option  value="1576 ">REG AA CT AA SCT KIRKOS K04 HN 909</option>
            <option  value="1604 ">R AA CTY AA SBC KIRKOS W09</option>
            <option  value="1606 ">R OROMIA C KULUBI W META K01</option>
            <option  value="1607 ">R HARARI C HARER K17</option>
            <option  value="1622 ">REG AMHARA CT WAD K01</option>
            <option  value="1043">Shashemene -Arada</option>
            <option  value="9001">Snr Branch manager</option>
            <option  value="9006">Snr Customer Service Official</option>
            <option  value="1001">S shine Bldg -near Flamingo</option>
            <option  value="1002">S shine Bldg -near Flamingo</option>
            <option  value="1004">Sumale Terra -Kelifa Bldg</option>
            <option  value="1009">S shine Bldg -near Flamingo </option>
            <option  value="1054">SIDIST KILO (INFRONT OF MEDHANIALEM</option>
            <option  value="1106">Signal (Signal Branch)</option>
            <option  value="1093">SUMMIT SQUARE TOWARDS</option>
            <option  value="1082">SHIRIE</option>
            <option  value="1100">SEBETA</option>
            <option  value="1113">SNNRP DAYE CITY KEBELE 02</option>
            <option  value="1115">SUMMIT AREA </option>
            <option  value="1186">SNNPRS HAWASSA CITY BAHLADARASH S.C</option>
            <option  value="1152">SHEWA  ROBIT CITY WOREDA 02</option>
            <option  value="1171 ">SNNP REGION SUB CITY RINZAFE K 05</option>
            <option  value="8224 ">Strategy Management Dep?t </option>
            <option  value="1221 ">SNNPRS REGION YIRACHEFFE CITY K02</option>
            <option  value="1228 ">SNNPRS REGION YIRGALEM CITY W DALE</option>
            <option  value="1268"> SNNPRS HOSAENA GMEDA</option>
            <option  value="1236 ">SNNPR ALETAWONDO CITY</option>
            <option  value="1278 ">SNNPRS CITY HAWASSA K FURA</option>
            <option  value="1279 ">SNNPRS CITY ARBAMINCH SUBCITY SECHA</option>
            <option  value="1288 ">SOMALI REGION GODE CITY</option>
            <option  value="11">Securities Dealer</option>
            <option  value="12">Securities Back Office User</option>
            <option  value="8312 ">service Desk Dep't</option>
            <option  value="8408 ">Service Desk Business</option>
            <option  value="8322 ">Sales Deposit Mobilization </option>
            <option  value="8386 ">Switch System</option>
            <option  value="1483 ">SNNPRS REGION BURJI WOREDA</option>
            <option  value="8378 ">Staff Benefits and Performance Processing </option>
            <option  value="1484 ">SNNPRS CITY KELE WOREDA AMARO</option>
            <option  value="8340 ">Sales and District Support </option>
            <option  value="1508 ">SNNPRS WOLKITIE BEKUR K 02 H 359</option>
            <option  value="1526 ">SOUTH REGION MORSITO CITY W MISHA</option>
            <option  value="1485 ">SNNNPRS CHELELEKTU CITY W KOCHORE</option>
            <option  value="1625 ">R SNNPRS CT SAJA W YEM SPETIAL</option>
            <option  value="1514 ">SOMALI REG DEGEHABUR CITY K 02</option>
            <option  value="1515 ">SOMALI RG CITY KEBRIDEHAR K02 H 0238</option>
            <option  value="8352 ">Sales and District Support</option>
            <option  value="8372 ">Succession & Career mgt</option>
            <option  value="8410 ">Service Desk Technical</option>
            <option  value="8424 ">Security Management</option>
            <option  value="8426 ">Specfication and Inspection </option>
            <option  value="8436 ">Strategy and Business Planning </option>
            <option  value="8450 ">Share and Investment</option>
            <option  value="8330 ">Safe Custody</option>
            <option  value="1036">Tepi -Habtom Abrha Bldg</option>
            <option  value="1067">TOGOCHALI(TAHH BLDG)</option>
            <option  value="1090">Tana Branch (Bahirdar 2)</option>
            <option  value="1190">TIGRAY REGION HADINET S.C K 18</option>
            <option  value="1197">TELE MEDHANEALEM AREA   	</option>
            <option  value="1157">TIGRAY REGION ADWA CITY KEBELE 06</option>
            <option  value="1158">TIGRAY REGION WUKROCITY KEBELE AGAZI</option>
            <option  value="8236 ">Treasury Department</option>
            <option  value="1260 ">TIGRAY REGIONAL STATE MEKELE CITY</option>
            <option  value="1261 ">TIGRAY RE MEHONI CITY RAYA AZEBO W</option>
            <option  value="1314 ">TIGRAY R CITY MEKELLE</option>
            <option  value="1280 ">TIGRAY R SUB-CITY ATSBI WONBERETA</option>
            <option  value="94">Trade Finance Supervisor 1</option>
            <option  value="95">Trade Finance Supervisor 2 </option>
            <option  value="96 ">Trade Finance Manager</option>
            <option  value="1324 ">TIGRAY R CITY ABIY ADI K 03</option>
            <option  value="2610 ">Trade Finance Manager </option>
            <option  value="55">Trade Finance Officer</option>
            <option  value="56">Trade Finance Supervisor</option>
            <option  value="5 ">Treasury Dealer</option>
            <option  value="31">Teller</option>
            <option  value="7 ">Treasury Supervisor (Back Office)  </option>
            <option  value="8 ">Treasury Supervisor</option>
            <option  value="8336 ">Technical Support</option>
            <option  value="1479 ">TIGRAY RS CITY ALAMATA K 01 H NEW</option>
            <option  value="8368 ">Talent Management</option>
            <option  value="8500 ">Transaction Control and Quality Assurance Dep't </option>
            <option  value="8374 ">Talent Acquisition </option>
            <option  value="8490 ">Talent Development</option> 
            <option  value="8414 ">Transport Management</option>
            <option  value="8376 ">Training Operations</option>
            <option  value="1010">Urael -Haile Gebresilassie Bldg</option>
            <option  value="8308 ">Vice President - Marketing </option>
            <option  value="8310 ">Vice President - Financial Management </option>
            <option  value="1079">WELETE SUK (WELETE BRANCH)</option>
            <option  value="1062">WELAYTA</option>
            <option  value="1070">WOLLKITE city(Wollkite branch</option>
            <option  value="1088">Wuhalimat Branch (Wuhalimat Area)</option>
            <option  value="1096 ">Woldiya city (Woldiya Branch</option>
            <option  value="1117">WOLLO SEFER AREA</option>
            <option  value="8272 ">West Addis District Office</option>
            <option  value="9056 ">WEST ADDIS ABABA DISTRICT</option>
            <option  value="9057 ">WEST ADDIS ABABA DISTRICT</option>
            <option  value="9058 ">WEST ADDIS ABABA DISTRICT</option>
            <option  value="9059 ">WEST ADDIS ABABA DISTRICT</option>
            <option  value="9060 ">WEST ADDIS ABABA DISTRICT</option>
            <option  value="9061 ">WEST ADDIS ABABA DISTRICT</option>
            <option  value="9062 ">WEST ADDIS ABABA DISTRICT</option>
            <option  value="9063 ">WEST ADDIS ABABA DISTRICT</option>
            <option  value="9064 ">WEST ADDIS ABABA DISTRICT</option>
            <option  value="9065 ">WEST ADDIS ABABA DISTRICT</option>
            <option  value="9066 ">WEST ADDIS ABABA DISTRICT</option>
            <option  value="9067 ">WEST ADDIS ABABA DISTRICT</option>
            <option  value="9068 ">WEST ADDIS ABABA DISTRICT</option>
            <option  value="9069 ">WEST ADDIS ABABA DISTRICT</option>
            <option  value="9070 ">WEST ADDIS ABABA DISTRICT</option>
            <option  value="9071 ">WEST ADDIS ABABA DISTRICT</option>
            <option  value="9072 ">WEST ADDIS ABABA DISTRICT</option>
            <option  value="9073 ">WEST ADDIS ABABA DISTRICT</option>
            <option  value="8296 ">Workout Loan Dep't</option>
            <option  value="9074 ">WEST ADDIS ABABA DISTRICT</option>
            <option  value="8416 ">Warehouse Management </option>
            <option  value="1453 ">WEST DISTRICT ADDIS ABABA</option>
            <option  value="1128">Yeka (Yeka Branch)</option>
            <option  value="1118">YERER BER AREA </option>
            </select>
        </div>

        <div className="d-flex justify-content-between mt-2">
        <p className="mt-2">Status</p>
        

        <select name="status" onChange={e=>setStatus(e.target.value)} className="form-select" style={{'height':'50px','width':'60%'}}>
                <option value="">Select</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
            </select>
        </div>
        {/* <button type="submit" id="Button"  className=" btn btn-warning w-100 mt-4 rounded" variant="warning">SUBMIT</button> */}

        <input type="submit" name="submit" onClick={CreateUser} value="Submit" className=" btn btn-warning w-100 mt-4 rounded" variant="warning" />

        <Link className="btn btn text-warning" to="/dashboard"> BACK </Link>
    </div>
    </div>
    
  );
};

export default CreateUser;
