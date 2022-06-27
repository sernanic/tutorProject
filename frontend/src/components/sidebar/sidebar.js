import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as mdIcons from 'react-icons/md';

function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false)
  return (
    <>


      <div>
        <Link to="#" className="menuBars">
          <mdIcons.MdHome />
        </Link>
        <h3 className="mt-20 text-4xl font-semibold text-black">I am a sidebar</h3>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="#" className="menuBars">
              <mdIcons.MdHome />
            </Link>
          </li>
          <li>
            <Link to="#" className="menuBars">
              <mdIcons.MdHome />
            </Link>
          </li>
          <li>
            <Link to="#" className="menuBars">
              <mdIcons.MdHome />
            </Link>
          </li>
          <li>
            <Link to="#" className="menuBars">
              <mdIcons.MdHome />
            </Link>
          </li>
        </ul>
      </nav>
    </>

  )
}

export default Sidebar;
