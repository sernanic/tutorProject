import React from 'react'
import './users.css'
import { Link } from "react-router-dom";
import Sidebar from '../../components/sidebar/sidebar';

import StudentsTable from '../../components/users/studentsTable'
function Users() {
  return (
    <div className='students'>
      <Sidebar />
     <div>
     {/* <Link to="/addStudent">
        <p>add student</p>
      </Link> */}
      <StudentsTable/>
     </div>
    </div>
  )
}

export default Users