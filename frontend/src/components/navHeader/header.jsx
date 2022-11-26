import React from 'react';

function NavHeader() {
  
  return (
    <>
      <div className="navContainer">
        <div className="headerTitle"></div>
        <div className="headerActionsContainer">
            <div className="notifications"></div>
            <div className="settings"></div>
            <div className="menu"></div>
            <div className="profile"></div>
        </div>
      </div>
      <hr />
    </>
  );
}
export default NavHeader;