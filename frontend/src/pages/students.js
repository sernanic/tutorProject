import React from 'react'
import './student.css'
import { Link } from "react-router-dom";

import StudentsTable from '../components/students/studentsTable'
function Students() {
  return (
    <div className='students'>
      <>
      <Link to="/addStudent">
        <p>add student</p>
      </Link>
      
      <StudentsTable/>
      </>
      
    </div>
  )
}

export default Students