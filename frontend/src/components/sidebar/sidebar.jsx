import React, {useContext,useState } from "react";
import { Link } from "react-router-dom";
import * as mdIcons from 'react-icons/md';
import {sideBarData} from './sidebarData';
import {AccountContext} from "../account/Account"
import './sidebar.css';
import {useNavigate} from "react-router-dom"
import {useSelectedUserStore} from "../../store/useStore"

function Sidebar() {
  const { getSession, logout } = useContext(AccountContext);
  const navigate = useNavigate();
  const getSelectedUser = useSelectedUserStore(state => state.selectedUser);

  function logOutSS(){
    logout();
    navigate("/login");
  }

  return (
    <>

      <nav className="nav-menu">
        <div className="companyLogoContainer">
          <h1>Logo</h1>
          <h1>{getSelectedUser['id']}</h1>
        </div>
        <div id="mainSideBarContent">
          <ul>
            {sideBarData.map((item,index)=>{
              return(
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="logOutLink">
        <button onClick={logOutSS}> <h1>Log Out</h1></button>
         
        </div>
      </nav>
    </>

  )
}

export default Sidebar;
