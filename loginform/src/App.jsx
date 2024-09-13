import { BrowserRouter,Route,Routes } from "react-router-dom"
import LoginForm from "./Components/LoginForm"
import ViewDetails from "./Components/viewDetails"
import { useState } from "react"


function App() {
  
const [userDetails,setUserDetails] = useState([]);
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm setUserDetails={setUserDetails}/>}/>
        <Route path='/view' element={<ViewDetails userDetails={userDetails} setUserDetails={setUserDetails}/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
