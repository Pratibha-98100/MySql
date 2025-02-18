import logo from './logo.svg';
import './App.css';
import Signup from './Signup';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from './Login';
import Home from './Home';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
         <Routes>
             <Route path="/" element={ <Home/>} />
             <Route path="/signup" element={ <Signup/>} />
             <Route path="/login" element={ <Login/>} />         
          </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
