import React, {useState,useRef,useCallback, useEffect} from "react";
import {Box, useMediaQuery} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import "../css/left.css";
import "../css/right.css";
import image from "../../assets/BoA logo.png";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import ReactCrop, {Crop} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

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

const Face = () => {
  const navigate = useNavigate();

  var Identity = localStorage.getItem("Id");
    
    var x = localStorage.getItem("Id");

    useEffect(()=>{
      if(x === null){
          navigate("/", { replace: true });
      }
  
  },[])

  var tk = localStorage.getItem("token");


    const webcamRef = useRef<any>(null);
    const [image, setImage] = useState<string>('');
    const [croppedImage, setCroppedImage] = useState<string>('');
    const [crop, setCrop] = useState<any>({unit: '%', width: 30, aspect: 9 / 9});
    const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
    const imgRef = useRef<any>(null);
    const [cropped, setCropped] = useState<boolean>(false)

    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);



    useEffect(() => {
        if (!completedCrop) {
            return;
        }

        const img = new Image();
        img.src = image;

        const canvas = document.createElement('canvas');
        const crop = completedCrop;

        const scaleX = img.naturalWidth / img.width;
        const scaleY = img.naturalHeight / img.height;
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio;

        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;
        ctx?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx!.imageSmoothingQuality = 'high';

        ctx?.drawImage(
            img,
            crop.x * scaleX*1.5,
            crop.y * scaleY*1.5,
            crop.width * scaleX,
            crop.height * scaleY ,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        );

        setCroppedImage(canvas.toDataURL('image/jpeg'))
    }, [completedCrop]);

    const cropImage = () => {
        setImage(croppedImage);
        setCropped(true);
    }


    const capture = useCallback(
        () => {
            setImage(webcamRef!.current!.getScreenshot());
        },
        [webcamRef]
    );

    

    const handleNext = () => {
        
        axios({  

            method: 'post',  
            headers: {
                'content-type': 'application/json',
                // authorization: 'Bearer '+tk,
              },
            url: `${getConfig("API_URL")}/user/${Identity}/token`, 
            data: JSON.stringify({"credentialType":'FACE',"credential":croppedImage.replace("data:image/jpeg;base64,", "")}) 
            
          }).then(res => {
              //console.log(res);
              //alert(res.data.status)

              if(res.data.status === 'COMPLETED'){
                localStorage.setItem('authtoken', res.data.data.accessToken);
                localStorage.setItem('Displayname', res.data.data.displayName);
                localStorage.setItem('Branch', res.data.data.branchId);
                alert('Face Authentication Success');
                navigate("/dashboard", { replace: true });
            }
            
           }).catch(err => { 
            // console.log('adssadhdjdvh',err.response)
            alert('Face Authentication Success');
            
          })
    }

    const retake = () => {
        setCroppedImage('')
        setImage('')
        setCropped(false)
    }
    

  return (
      
      <div> 
    <div className="d-flex justify-content-center"id="contentContainer" >
    <div id="containerLeft">
        
    </div>
    <div id="containerRight">
    <Box display={'flex'} flexDirection={'row'} alignContent={'center'} justifyContent={'center'}
                     height={'27.9rem'} width={'100%'} marginTop={'-2.3rem'} >
                    {!image?.length ? <Webcam
                            audio={false}
                            height={400}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width={500}
                            videoConstraints={videoConstraints}
                        /> :
                        <Box  marginTop={'.5rem'}  >

                            {cropped && croppedImage?.length ? <img style={{
                                width: Math.round(completedCrop?.width ?? 0),
                                height: Math.round(completedCrop?.height ?? 0)
                            }} src={croppedImage}/> : <ReactCrop
                                src={image}
                                onImageLoaded={onLoad}
                                crop={crop}
                                onChange={(c) => setCrop(c)}
                                onComplete={(c) => setCompletedCrop(c)}
                            />}
                        </Box>
                    }
                </Box>


                <Box display={'flex'} flexDirection={'column'} alignContent={'center'} justifyContent={'center'}>
                    {!image?.length ? <Button variant={"contained"} style={{'background':'#F1AB15','fontSize':'1.125rem','boxShadow':'unset','height':'2.8rem', 'borderRadius': '16px','width': '26rem',}} onClick={() => {
                            capture()
                        }}>Capture</Button>
                        : <Box style={{
                            display: 'flex',
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Button variant={"contained"}style={{'background':'#F1AB15','fontSize':'1.125rem','boxShadow':'unset','height':'2.8rem', 'borderRadius': '16px','width': '26rem','marginRight':'2rem'}}   onClick={() => {
                                retake()
                            }}>Re-take</Button>

                            {cropped ?
                                <Button variant={"contained"} style={{'background':'#F1AB15','fontSize':'1.125rem','boxShadow':'unset','height':'2.8rem', 'borderRadius': '16px','width': '26rem',}}  onClick={() => {
                                    handleNext()
                                }} >Continue</Button> :
                                <Button variant={"contained"}style={{'background':'#F1AB15','fontSize':'1.125rem','boxShadow':'unset','height':'2.8rem', 'borderRadius': '16px','width': '26rem',}}  onClick={() => {
                                    cropImage()
                                }} >Crop</Button>
                            }
                        </Box>}
                </Box>
    </div>
        
      </div>
      </div>
      
      
 
    
  );
};

export default Face;
