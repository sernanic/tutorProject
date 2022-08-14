import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as mdIcons from 'react-icons/md';
import {sideBarData} from './sidebarData';
import {useSelector, useDispatch} from 'react-redux'
import './sidebar.css';

function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false)
  const userState = useSelector((state)=>state.user);
  return (
    <>

      <nav className="nav-menu">
        <div className="companyLogoContainer">
          <h1>Logo</h1>
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
          <h1>Log Out</h1>
        </div>
      </nav>
    </>

  )
}

export default Sidebar;
