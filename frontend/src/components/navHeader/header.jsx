import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../store/index';

function NavHeader() {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const { loginAdmin, loginStudent, loginTutor } = bindActionCreators(actionCreators, dispatch)
  const onSubmit = data => console.log(data);

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