import React, { useEffect, useMemo, useState,useContext } from 'react'
import Sidebar from '../../components/sidebar/sidebar';
import './home.css'
import {AccountContext} from "../../components/account/Account"
import { Navigate, useNavigate } from 'react-router-dom';
import {useSelectedUserStore} from "../../store/useStore"
function Home() {
  
  const [status, setStatus] = useState(false);

  const { getSession, logout } = useContext(AccountContext);

  const updateUser = useSelectedUserStore((state) => state.updateUser)

  useEffect(() => {
    getSession().then((session) => {
      setStatus(true);
    });
  }, []);
  if(status){
    return (
    <div className='home'>
      <Sidebar/>
      
      <button onClick={()=>updateUser("new user")}>this is an update button</button>
      <br/>
      <button onClick={()=>updateUser("old user")}>this is an update button 2</button>

    </div>
    );
  }
  else{
    return(
      <h1> you are not logged in </h1>
      //<Navigate to="/login" replace/>
    )
  }
  
}
export default Home;