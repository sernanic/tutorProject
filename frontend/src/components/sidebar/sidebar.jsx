import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as mdIcons from 'react-icons/md';
import {sideBarData} from './sidebarData';
import './sidebar.css';

function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false)
  return (
    <>
      <nav className="nav-menu">
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
      </nav>
    </>

  )
}

export default Sidebar;
