import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./Login/LoginPage";
import LoanPage from "./Loan/LoanPage";
import LandingPage from "./Landing/LandingPage";
// import LoadingModal from "./Loading/LoadingModal";
import ErrorPage from "./Error/ErrorPage";

function App() {
  return (
    <Router>
      {/* <NavBar /> */}
      <Routes>
        <Route exact path="/home" element={<LandingPage/>} />
        <Route exact path="login" element={<LoginPage/>} />
        <Route exact path="loan" element={<LoanPage/>} />
        <Route exact path="error" element={<ErrorPage/>} />
        {/* <Route exact path="load" element={<LoadingModal/>} /> */}
        <Route path="/" element={<Navigate to='/home'/>}/>
        
        
      </Routes>
    </Router>
  );
}

export default App;
