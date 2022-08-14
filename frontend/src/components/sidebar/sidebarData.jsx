import React, { useState } from "react";
import * as mdIcons from 'react-icons/md';
import * as ioIcons from 'react-icons/io';
import * as faIcons from 'react-icons/fa';
import * as aiIcons from 'react-icons/ai';
import * as hiIcons from "react-icons/hi";

// go to https://react-icons.github.io/react-icons to see available icons



export const sideBarData =[
    {
        title:'Home',
        path:'/home',
        icon:  <aiIcons.AiFillHome/>,
        cName: "nav-text"
    },
    {
        title:'Tutors',
        path:'/home',
        icon:  <faIcons.FaUserAlt/>,
        cName: "nav-text"
    },
    {
        title:'Students',
        path:'/students',
        icon:  <faIcons.FaUserGraduate/>,
        cName: "nav-text"
    },
    {
        title:'Reports',
        path:'/reports',
        icon:  <hiIcons.HiOutlineDocumentReport/>,
        cName: "nav-text"
    },
    {
        title:'Settings',
        path:'/settings',
        icon:  <ioIcons.IoIosSettings/>,
        cName: "nav-text"
    },
    
]