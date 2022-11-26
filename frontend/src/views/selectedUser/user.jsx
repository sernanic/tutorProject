import React, { useEffect, useMemo, useState,useContext } from 'react'
import Sidebar from '../../components/sidebar/sidebar';
import './user.css'
import {AccountContext} from "../../components/account/Account"
import { Navigate, useNavigate } from 'react-router-dom';
import {useSelectedUserStore} from "../../store/useStore"
function User() {
  
  const [status, setStatus] = useState(false);

  const { getSession, logout } = useContext(AccountContext);

  const getSelectedUser = useSelectedUserStore(state => state.selectedUser);


  useEffect(() => {
    getSession().then((session) => {
      setStatus(true);
    });
  }, []);
  if(status){
    return (
    <div className='userContainer'>
      <Sidebar/>
      {getSelectedUser['name']}
      

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
export default User;