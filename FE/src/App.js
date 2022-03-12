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
import { TrolleyProvider } from "./Context/TrolleyProvider";

function App() {
  return (
    // <TrolleyProvider> 
    <Router>
      {/* <NavBar /> */}
      <Routes>
        <Route exact path="/home/:id" element={<LandingPage/>} />
        <Route exact path="login/:id" element={<LoginPage/>} />
        <Route exact path="loan/:id" element={<LoanPage/>} />
        <Route exact path="error" element={<ErrorPage/>} />
        <Route exact path="home/" element={<h1>Welcome!</h1>} />
        {/* <Route exact path="load" element={<LoadingModal/>} /> */}
        <Route path="/*" element={<Navigate to='/home'/>}/>        
      </Routes>
    </Router>
    // </TrolleyProvider>
  );
}

export default App;
