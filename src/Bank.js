import React from 'react';
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import Register from './Register';

import 'bootstrap/dist/css/bootstrap.css';



function Bank() {
  
  return (
   <div>
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register/>}/>
          
         
        </Routes>
     </BrowserRouter>
   </div>
   
  )
}

export default Bank;
