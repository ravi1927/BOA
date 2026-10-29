import React, {useState,useRef,useCallback, useEffect} from "react";
import {Box, TextField,Grid, useMediaQuery} from "@mui/material";
import leftFinger from "../../assets/leftIndex.png";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import "../css/left.css";
import "../css/right.css";
import image from "../../assets/BoA logo.png";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import ReactCrop, {Crop} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import finger from '../../assets/finger.png';

import axios from "axios";
import {getConfig} from "../../lib";
import Webcam from "react-webcam";
import { Button } from "react-bootstrap";

toast.configure()




const videoConstraints = {
    width: 519,
    height: 400,
    facingMode: "user"
};

const Finger = () => {
  const navigate = useNavigate();

  const newarray = localStorage.getItem('fingerarray');

  var movies2 = JSON.parse(newarray);

  //console.log(movies2);

  const [fingerPosition, setFingerPosition] = useState('')
  const [fingerprint, setFinger] = useState('')

  var Identity = localStorage.getItem("Id");
    
    var x = localStorage.getItem("Id");

    useEffect(()=>{
      if(x === null){
          navigate("/", { replace: true });
      }
  
  },[])


     const handleNext = () => {

        axios({  

            method: 'post',  
            headers: {
                'content-type': 'application/json',
                // authorization: 'Bearer '+tk,
              },
            url: `${getConfig("API_URL")}/user/${Identity}/token`, 
            data: JSON.stringify({"credentialType":'FINGERPRINT',"credential":fingerprint}) 
            
          }).then(res => {
              //console.log(res);
              //alert(res.data.status)
              localStorage.setItem('Displayname', res.data.data.displayName);
              localStorage.setItem('Branch', res.data.data.branchId);
              if(res.data.status === 'COMPLETED'){
                alert('Finger Authentication Success');
                navigate("/dashboard", { replace: true });
            }
            
           }).catch(err => { 
            // console.log('adssadhdjdvh',err.response)
            alert('Finger Authentication Failed PLease Try Again');
            navigate("/", { replace: true });
            
          })
    
    }

        const handleScan = () => {
            fetch("https://device.aptiway.com:9004",
            {
                method:'POST',
                body:JSON.stringify({     
        "cmd" : 2,
        "finger_index" : 1,
        "compression_type" : 1,
        "export_bmp" : false

        }),
            })
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                setFinger(data.awmsosvc_response)
            })

        }

        const handleClear = () => {
            setFinger('');
        }
    

    // const handleNext = () => {
        
    //     axios({  

    //         method: 'post',  
    //         headers: {
    //             'content-type': 'application/json',
    //             // authorization: 'Bearer '+tk,
    //           },
    //         url: `${getConfig("API_URL")}/user/${Identity}/token`, 
    //         data: JSON.stringify({"credentialType":'FACE',"credential":croppedImage.replace("data:image/jpeg;base64,", "")}) 
            
    //       }).then(res => {
    //           //console.log(res);
    //           //alert(res.data.status)

    //           if(res.data.status === 'COMPLETED'){
    //             alert('Face Authentication Success');
    //             navigate("/dashboard", { replace: true });
    //         }
            
    //        }).catch(err => { 
    //         // console.log('adssadhdjdvh',err.response)
    //         alert('Face Authentication Success');
            
    //       })
    // }


  return (
      <>
      <div className="d-flex justify-content-center"id="contentContainer" >
    <div id="containerLeft">
        
    </div>
    <div id="containerRight">
      <Box display={'flex'} flexDirection={'row'} alignContent={'center'} justifyContent={'center'}
                     height={'8rem'} width={'90%'} margin={'1rem 2rem 2rem 2rem'}>
                    <img alt={'left-index-finger'} src={leftFinger}/>
                </Box>
                <Grid item md={12} xs={12} lg={12} display={"flex"} justifyContent={"center"}>
                    <div style={{ 'height': '.15rem', 'background': '#1c1c1c','width': '14rem'}}/>
                </Grid>
                <Box display={'flex'} flexDirection={'row'} alignContent={'center'} justifyContent={'center'}
                     width={'100%'} marginTop={'2rem'}>
                    <TextField
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                height: '2rem'
                            }
                        }}
                        select
                        value={fingerPosition}
                        onChange={(event) => {
                            setFingerPosition(event.target.value)
                        }}
                        SelectProps={{native: true}}
                        style={{width: '60%'}}>
                        <option value={''}>Select Finger Position</option>
                       {movies2.map((position) => (
                            <option value={position}>{position}</option>
                        ))}
                    </TextField>
                </Box>

                <Box display={'flex'} flexDirection={'row'} alignContent={'center'} justifyContent={'center'}
                     width={'100%'} marginTop={'1rem'}>
                    {fingerprint ? <img src={finger}
                                         alt={'finger-print'}/> : null}
                </Box>

                <Box display={'flex'} flexDirection={'column'} alignContent={'center'} justifyContent={'center'}>
                    {!fingerprint?.length ? <Button variant={"contained"}  style={{'background':'#F1AB15','fontSize':'1.125rem','boxShadow':'unset','height':'2.8rem', 'borderRadius': '16px','width': '26rem',}} onClick={() => {
                        handleScan()
                    }} >Scan</Button> : null}
                    {fingerprint?.length ? <Button variant={"contained"}  style={{'background':'#F1AB15','fontSize':'1.125rem','boxShadow':'unset','height':'2.8rem', 'borderRadius': '16px','width': '26rem','marginBottom':'1rem','marginTop':'1rem'}} onClick={() => {
                        handleClear()
                    }} >Clear</Button> : null}
                    {fingerprint?.length ? <Button variant={"contained"}  style={{'background':'#F1AB15','fontSize':'1.125rem','boxShadow':'unset','height':'2.8rem', 'borderRadius': '16px','width': '26rem',}} onClick={() => {
                        handleNext()
                    }} 
                                                   disabled={!fingerPosition.length || !fingerprint?.length}>Proceed</Button> : null}
                </Box>
                </div>
                </div>
      </>
    

    
  );
};

export default Finger;
