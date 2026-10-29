
import './App.css';
import Login from './components/Login/index';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect
} from "react-router-dom";
import {getConfig} from "./lib";

import Dashboard from './components/dashboard/index';

import Password from './components/Login/password';

import CreatUsers from './components/users/createuser';

import Sucessuser from './components/users/usersucess'

import EditUser from './components/users/edituser';

import Updateuser from './components/users/userupdatesucess';

import LoginType from './components/Login/logintypes';

import Face from './components/Login/face.tsx';

import Finger from './components/Login/finger.tsx';

function App() {
  return (
    <div className="App">
      <Router basename={getConfig("CONTEXT_ROOT")}>
        <Routes>
          {/* {
            !localStorage.getItem('Id') ? <Redirect path="/" element={<Login />} /> : ''
          } */}
          <Route path="/" element={<Login />} />

          <Route path="/logintypes" element={<LoginType />} />
          <Route path="/face" element={<Face />} />
          <Route path="/finger" element={<Finger />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/password" element={<Password />} />
          <Route path="/user" element={<CreatUsers />} />
          <Route path="/usersucess" element={<Sucessuser />} />
          <Route path="/useredit" element={<EditUser />} />
          <Route path="/userupdate" element={<Updateuser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
