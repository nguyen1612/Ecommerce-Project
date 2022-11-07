import Login from "./component/register/login";
import Signup from './component/register/signup'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return <Router>

    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
    </Routes>
    
  </Router>
}

export default App;
