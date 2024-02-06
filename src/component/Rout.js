import { Route, Routes } from "react-router-dom";
import Home from "./Home";

import Navbar from "./Navbar";

function Rout(){
  
    
    return(
        <div>
            <Navbar/>
            <Routes>
                <Route path="/home" element={<Home/>}/>
               
            </Routes>
        </div>
    )
}export default Rout