import './App.css';
import Sidebar from './components/sidebar';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
function App() {
  return (
    <>
    <Router>
    <Sidebar/>
    <Routes>
    <Route path="/"/>
    </Routes>
    </Router>
    </> 
   
    
  )
} 

export default App;
