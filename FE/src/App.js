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

function App() {
  return (
    <Router>
      {/* <NavBar /> */}
      <Routes>
        <Route exact path="/home" element={<LandingPage/>} />
        <Route exact path="login" element={<LoginPage/>} />
        <Route exact path="loan" element={<LoanPage/>} />
        <Route path="/" element={<Navigate to='/home'/>}/>
        
        
      </Routes>
    </Router>
  );
}

export default App;
