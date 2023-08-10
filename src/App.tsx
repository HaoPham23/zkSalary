import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './components/pages/LandingPage';
import LoginPage from './components/CompanyApp/LoginPage';
import HomePage from './components/CompanyApp/HomePage';
import Prover from './components/ProveApp/Prover';
import Verifier from './components/VerifyApp/Verifier';
import Add from './components/CompanyApp/Add';
import { AuthProvider } from './auth/AuthContext';
import './App.css';
import BackgroundImage from './assets/images/bg.jpg';
import PrivateRoutes from './utils/ProtectedRoutes';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <div style={AppStyle}>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          {/* <Route path="/home" element={<HomePage/>} /> */}
          <Route element={<PrivateRoutes/>}>
            <Route path='/home' element={<HomePage/>}/>
            <Route path="/home/add" element={<Add/>} />
          </Route>
          <Route path="/prove" element={<Prover/>} />
          <Route path="/verify" element={<Verifier/>} />
          
        </Routes>
      </div>
    </BrowserRouter>
    </AuthProvider>
  );
};

const AppStyle = {
  width: '100%',
  height: '100vh',
  background: `url(${BackgroundImage})`,
  backgroundPosition: 'center',
  backgroundSize: 'contain',
  overflow: 'scroll'
};

export default App;

