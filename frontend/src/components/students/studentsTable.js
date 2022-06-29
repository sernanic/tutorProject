import React,{ useEffect, useState } from 'react'
import axios from 'axios';

function StudentsTable() {
    const [allStudents, setAllStudents] = useState([]);
      useEffect(() => {
        getAllStudents()
      }, []);

      const getAllStudents = () => {
        axios.get('http://127.0.0.1:8000/users/list').then( response => {
            const students = response.data
            console.log(students)
            setAllStudents(students)
        })
      }
      
  return (
   
<div>     
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                     name
                </th>
                <th scope="col" class="px-6 py-3">
                    email
                </th>
                <th scope="col" class="px-6 py-3">
                    password
                </th>
                
                <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
       
         {allStudents.map((item,index)=>{
            return(
                <>

            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                <span>{item.userName} </span>
                </th>
                <td class="px-6 py-4">
                <span>{item.userEmail} </span>
                </td>
                <td class="px-6 py-4">
                <span>{item.userPassword} </span>
                </td>
                <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
               </tr>
                </>
            )
          })}
       
           
        </tbody>
    </table> 
</div>
  )
}

export default StudentsTable